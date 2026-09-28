import os
import numpy as np
from scipy.io import wavfile
import subprocess
import asyncio

os.makedirs('public/audio', exist_ok=True)

# 1. Generate Voice using edge-tts (requires pip install edge-tts)
# We spell it "A S" so it pronounces the letters.
text = "Welcome to A S, Infra Companies. <break time='1000ms' /> Building today, for a better tomorrow."
# Using SSML to add the pause
ssml = f"""<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">
<voice name="en-US-BrianNeural">
<prosody rate="-5%" pitch="-2%">
Welcome to A S, Infra Companies. <break time="1500ms" /> Building today, for a better tomorrow.
</prosody>
</voice>
</speak>"""

with open("voice.ssml", "w") as f:
    f.write(ssml)

# Run edge-tts
subprocess.run(['edge-tts', '--ssml', 'voice.ssml', '--write-media', 'public/audio/intro-voice.mp3'])

# 2. Generate Cinematic Low Rumble (Ambience)
sample_rate = 44100
duration = 8.0 # seconds
t = np.linspace(0, duration, int(sample_rate * duration), endpoint=False)

# Low frequency sweep (40Hz to 60Hz)
freq = np.linspace(40, 60, len(t))
rumble = 0.5 * np.sin(2 * np.pi * freq * t)

# Add some filtered brownian-like noise for air texture
noise = np.random.normal(0, 1, len(t))
# Simple low-pass filter for noise using convolution
window = np.ones(50) / 50
noise_filtered = np.convolve(noise, window, mode='same') * 0.1

ambience = rumble + noise_filtered
# Fade in and out
fade_in = np.linspace(0, 1, int(sample_rate * 2.0))
fade_out = np.linspace(1, 0, int(sample_rate * 2.0))
ambience[:len(fade_in)] *= fade_in
ambience[-len(fade_out):] *= fade_out

# Normalize and convert to 16-bit PCM
ambience_norm = np.int16((ambience / np.max(np.abs(ambience))) * 16000) # -6dB
wavfile.write('public/audio/intro-ambience.wav', sample_rate, ambience_norm)

# 3. Generate Logo Reveal (Soft synthetic ping/pad)
duration_reveal = 3.0
t_rev = np.linspace(0, duration_reveal, int(sample_rate * duration_reveal), endpoint=False)
# Mix of a few sine waves forming a premium chord (e.g., C major 9: C4, E4, G4, B4, D5)
# C4=261.63, E4=329.63, G4=392.0, B4=493.88, D5=587.33
freqs = [261.63/2, 392.0/2, 493.88/2] # deep soft chord
reveal = np.zeros_like(t_rev)
for f in freqs:
    reveal += np.sin(2 * np.pi * f * t_rev)

# Envelope (fast attack, long release)
attack = np.linspace(0, 1, int(sample_rate * 0.05))
decay = np.exp(-t_rev * 2.0)
env = np.ones_like(t_rev)
env[:len(attack)] = attack
env *= decay

reveal = reveal * env * 0.3
reveal_norm = np.int16((reveal / np.max(np.abs(reveal))) * 20000)
wavfile.write('public/audio/logo-reveal.wav', sample_rate, reveal_norm)

# 4. Generate Construction Ambience (Distant mechanical hum, rhythmic clanks)
t_const = np.linspace(0, 10.0, int(sample_rate * 10.0), endpoint=False)
const_noise = np.random.normal(0, 1, len(t_const))
window2 = np.ones(200) / 200
const_noise_filtered = np.convolve(const_noise, window2, mode='same') * 0.3

# Rhythmic metallic hit every 1.5s
hit_env = np.zeros_like(t_const)
for i in range(1, int(10.0/1.5)):
    idx = int(i * 1.5 * sample_rate)
    hit_env[idx:idx+int(sample_rate*0.1)] = np.exp(-np.linspace(0, 5, int(sample_rate*0.1)))

hit_sound = np.sin(2 * np.pi * 1000 * t_const) * hit_env * 0.1

const_final = const_noise_filtered + hit_sound
const_fade = np.linspace(0, 1, int(sample_rate * 3.0))
const_final[:len(const_fade)] *= const_fade

const_norm = np.int16((const_final / np.max(np.abs(const_final))) * 12000)
wavfile.write('public/audio/construction-ambience.wav', sample_rate, const_norm)

print("Audio generation complete.")
