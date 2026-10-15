import { useState, useEffect, useRef, useCallback } from 'react';

export type VoiceState = 'idle' | 'playing' | 'paused';

interface UseStoryNarratorProps {
  storyId?: string;
  chapterNumber?: number;
  title?: string;
  content?: string;
  lang: 'vi' | 'en';
}

// Global active audio instance to guarantee no two audio files ever play simultaneously
let globalActiveAudio: HTMLAudioElement | null = null;

export function getStoryAudioSrc(storyId?: string, chapterNumber: number = 1): string {
  if (storyId === 'chiec-ao-biet-tho') {
    return `/audio/chiec-ao-biet-tho-chuong-${chapterNumber}.mp3`;
  }
  return `/audio/eco-story-chuong-${chapterNumber}.mp3`;
}

export function useStoryNarrator({
  storyId,
  chapterNumber = 1,
  title,
  content,
  lang
}: UseStoryNarratorProps) {
  const [voiceState, setVoiceState] = useState<VoiceState>('idle');
  const [progress, setProgress] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Audio ref for Vietnamese audio file playback
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // SpeechSynthesisUtterance ref for English TTS playback
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Track voices for Web Speech API
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  // Check support
  const isSupported =
    typeof window !== 'undefined' &&
    (lang === 'en'
      ? 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window
      : typeof Audio !== 'undefined');

  const isAudioAvailable = isSupported;

  // Listen to speechSynthesis voices
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const loadVoices = () => {
      const v = window.speechSynthesis.getVoices();
      if (v && v.length > 0) {
        setVoices(v);
      }
    };

    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  // Helper to pick English voice with specified priority:
  // 1. en-US
  // 2. en-GB
  // 3. any voice where lang starts with "en"
  const getEnglishVoice = useCallback(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return { englishVoices: [], selected: null };
    }

    const available =
      window.speechSynthesis.getVoices().length > 0
        ? window.speechSynthesis.getVoices()
        : voices;

    const englishVoices = available.filter((v) =>
      v.lang.toLowerCase().startsWith('en')
    );

    const selected =
      available.find((v) => v.lang === 'en-US') ||
      available.find((v) => v.lang === 'en-GB') ||
      englishVoices[0] ||
      null;

    return { englishVoices, selected };
  }, [voices]);

  // Clean stop for all playback (both Web Speech API and HTMLAudioElement)
  const stop = useCallback(() => {
    // 1. Cancel Web Speech API
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // ignore
      }
    }
    utteranceRef.current = null;

    // 2. Stop HTMLAudioElement (VI)
    if (audioRef.current) {
      try {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      } catch {
        // ignore errors on pause
      }
    }
    if (globalActiveAudio === audioRef.current) {
      globalActiveAudio = null;
    }

    setVoiceState('idle');
    setProgress(0);
    setCurrentTime(0);
  }, []);

  const pause = useCallback(() => {
    if (lang === 'en') {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        try {
          window.speechSynthesis.pause();
          setVoiceState('paused');
        } catch (err) {
          console.error('Error pausing speech synthesis:', err);
        }
      }
    } else {
      if (audioRef.current && !audioRef.current.paused) {
        try {
          audioRef.current.pause();
          setVoiceState('paused');
        } catch (err) {
          console.error('Error pausing audio:', err);
        }
      }
    }
  }, [lang]);

  const resume = useCallback(async () => {
    if (lang === 'en') {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        try {
          window.speechSynthesis.resume();
          setVoiceState('playing');
          setErrorMessage(null);
        } catch (err) {
          console.error('Error resuming speech synthesis:', err);
        }
      }
    } else {
      if (audioRef.current && audioRef.current.paused) {
        try {
          if (globalActiveAudio && globalActiveAudio !== audioRef.current) {
            globalActiveAudio.pause();
            globalActiveAudio.currentTime = 0;
          }
          globalActiveAudio = audioRef.current;

          await audioRef.current.play();
          setVoiceState('playing');
          setErrorMessage(null);
        } catch (err) {
          console.error('Error resuming audio:', err);
          setVoiceState('idle');
        }
      }
    }
  }, [lang]);

  const play = useCallback(async () => {
    // Stop any active playback globally
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // ignore
      }
    }
    if (globalActiveAudio && globalActiveAudio !== audioRef.current) {
      try {
        globalActiveAudio.pause();
        globalActiveAudio.currentTime = 0;
      } catch {
        // ignore
      }
    }

    if (lang === 'en') {
      // ==========================================
      // ENGLISH TTS (Web Speech API)
      // ==========================================
      if (
        typeof window === 'undefined' ||
        !('speechSynthesis' in window) ||
        !('SpeechSynthesisUtterance' in window)
      ) {
        setErrorMessage('Speech Synthesis is not supported in this browser.');
        return;
      }

      const { englishVoices, selected: selectedEnglishVoice } = getEnglishVoice();

      // Debug logs required by prompt
      console.log('Current language:', lang);
      console.log('English voices:', englishVoices);
      console.log('Selected English voice:', selectedEnglishVoice);

      const textToRead = `${title ? title + '. ' : ''}${content || ''}`.trim();
      if (!textToRead) {
        console.warn('No English content to read for this chapter.');
        return;
      }

      const utterance = new SpeechSynthesisUtterance(textToRead);

      // Priority and voice assignment
      utterance.lang = selectedEnglishVoice?.lang || 'en-US';
      if (selectedEnglishVoice) {
        utterance.voice = selectedEnglishVoice;
      }

      // Voice settings for children: gentle & clear
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      utterance.onstart = () => {
        setVoiceState('playing');
        setErrorMessage(null);
      };

      utterance.onpause = () => {
        setVoiceState('paused');
      };

      utterance.onresume = () => {
        setVoiceState('playing');
      };

      utterance.onend = () => {
        setVoiceState('idle');
        setProgress(0);
        utteranceRef.current = null;
      };

      utterance.onerror = (e) => {
        if (e.error !== 'interrupted' && e.error !== 'canceled') {
          console.warn('SpeechSynthesis error:', e.error);
        }
        setVoiceState('idle');
        setProgress(0);
        utteranceRef.current = null;
      };

      utterance.onboundary = (e) => {
        if (textToRead.length > 0 && e.charIndex !== undefined) {
          const pct = Math.min(100, Math.round((e.charIndex / textToRead.length) * 100));
          setProgress(pct);
        }
      };

      utteranceRef.current = utterance;

      try {
        window.speechSynthesis.resume();
        window.speechSynthesis.speak(utterance);
        setVoiceState('playing');
        setErrorMessage(null);
      } catch (err: any) {
        console.error('Failed to speak English utterance:', err);
        setVoiceState('idle');
        setErrorMessage('Could not play English audio narration. Please try again.');
      }
    } else {
      // ==========================================
      // VIETNAMESE Audio File Playback (UNCHANGED)
      // ==========================================
      const audioSrc = getStoryAudioSrc(storyId, chapterNumber);

      // Initialize or re-use HTMLAudioElement
      let audio = audioRef.current;
      if (!audio) {
        audio = new Audio();
        audioRef.current = audio;
      }
      globalActiveAudio = audio;

      // Check if resuming current audio
      const currentSrcNormalized = audio.src ? new URL(audio.src, window.location.href).pathname : '';
      if (currentSrcNormalized === audioSrc && audio.currentTime > 0 && !audio.ended && audio.paused) {
        try {
          await audio.play();
          setVoiceState('playing');
          setErrorMessage(null);
          return;
        } catch (err) {
          console.warn('Failed to resume, re-initializing track:', err);
        }
      }

      // Load new audio file
      audio.src = audioSrc;
      audio.currentTime = 0;
      audio.preload = 'auto';

      try {
        await audio.play();
        setVoiceState('playing');
        setErrorMessage(null);
      } catch (err: any) {
        console.error('Failed to play audio file:', audioSrc, err);
        setVoiceState('idle');
        setErrorMessage('Không thể phát file âm thanh. Vui lòng bấm thử lại.');
      }
    }
  }, [lang, storyId, chapterNumber, title, content, getEnglishVoice]);

  // Set up audio event listeners for VI HTMLAudioElement
  useEffect(() => {
    let audio = audioRef.current;
    if (!audio) {
      audio = new Audio();
      audioRef.current = audio;
    }

    const onTimeUpdate = () => {
      if (!audio || lang !== 'vi') return;
      const cur = audio.currentTime || 0;
      const dur = audio.duration || 0;
      setCurrentTime(cur);
      if (dur > 0) {
        setDuration(dur);
        setProgress(Math.min(100, Math.round((cur / dur) * 100)));
      }
    };

    const onEnded = () => {
      if (lang !== 'vi') return;
      setVoiceState('idle');
      setProgress(0);
      setCurrentTime(0);
      if (globalActiveAudio === audio) {
        globalActiveAudio = null;
      }
    };

    const onPause = () => {
      if (lang !== 'vi') return;
      if (audio && !audio.ended && audio.currentTime > 0) {
        setVoiceState('paused');
      }
    };

    const onPlay = () => {
      if (lang !== 'vi') return;
      setVoiceState('playing');
    };

    const onError = () => {
      if (lang !== 'vi') return;
      console.warn('Audio playback error on element for:', audio?.src);
      setVoiceState('idle');
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('error', onError);

    return () => {
      audio?.removeEventListener('timeupdate', onTimeUpdate);
      audio?.removeEventListener('ended', onEnded);
      audio?.removeEventListener('pause', onPause);
      audio?.removeEventListener('play', onPlay);
      audio?.removeEventListener('error', onError);
    };
  }, [lang]);

  // Chrome SpeechSynthesis keepalive mechanism for long sentences
  useEffect(() => {
    if (lang !== 'en' || voiceState !== 'playing') return;
    const interval = setInterval(() => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
          window.speechSynthesis.pause();
          window.speechSynthesis.resume();
        }
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [lang, voiceState]);

  // When chapterNumber or storyId changes, stop playback immediately
  useEffect(() => {
    stop();
  }, [storyId, chapterNumber, stop]);

  // When language switches (VI <-> EN), stop playback immediately and cancel speechSynthesis
  useEffect(() => {
    stop();
  }, [lang, stop]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  const clearError = useCallback(() => {
    setErrorMessage(null);
  }, []);

  return {
    voiceState,
    progress,
    currentTime,
    duration,
    isSupported,
    isAudioAvailable,
    errorMessage,
    clearError,
    play,
    pause,
    resume,
    stop
  };
}
