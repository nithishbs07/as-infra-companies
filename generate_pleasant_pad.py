import numpy as np
from scipy.io import wavfile

sample_rate = 44100
duration = 8.0
t = np.linspace(0, duration, int(sample_rate * duration), False)

# C Major add 9 frequencies for a warm, pleasant, corporate ambient pad
freqs = [130.81, 164.81, 196.00, 261.63, 293.66] # C3, E3, G3, C4, D4

audio = np.zeros_like(t)
for f in freqs:
    # Mix sine and a bit of triangle for warmth
    sine = np.sin(2 * np.pi * f * t)
    # triangle approximation
    triangle = (2 / np.pi) * np.arcsin(np.sin(2 * np.pi * f * t))
    audio += (0.8 * sine + 0.2 * triangle) / len(freqs)

# Envelope: gentle fade in (2s), fade out (2s)
fade_in_samples = int(2.0 * sample_rate)
fade_out_samples = int(2.0 * sample_rate)

envelope = np.ones_like(t)
envelope[:fade_in_samples] = np.linspace(0, 1, fade_in_samples)
envelope[-fade_out_samples:] = np.linspace(1, 0, fade_out_samples)

audio = audio * envelope

# Soften high frequencies (low-pass)
window_size = 30
audio = np.convolve(audio, np.ones(window_size)/window_size, mode='same')

# Normalize to a pleasant background volume
audio = audio / np.max(np.abs(audio)) * 0.35

wavfile.write('public/audio/pleasant-pad.wav', sample_rate, audio.astype(np.float32))
