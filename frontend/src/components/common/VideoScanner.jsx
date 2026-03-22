import React, { useState, useEffect, useRef } from 'react';
import { Camera, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';

const VideoScanner = ({ onAnalysisComplete }) => {
    const videoRef = useRef(null);
    const [stream, setStream] = useState(null);
    const [status, setStatus] = useState('idle'); // idle, connecting, scanning, complete, error
    const [progress, setProgress] = useState(0);

    const startCamera = async () => {
        try {
            setStatus('connecting');
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
            setStream(mediaStream);
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
            }
            setStatus('scanning');
        } catch (err) {
            console.error("Camera access denied:", err);
            setStatus('error');
        }
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
    };

    useEffect(() => {
        // Cleanup on unmount
        return () => stopCamera();
    }, [stream]);

    useEffect(() => {
        if (status === 'scanning') {
            // Simulate AI scanning progress
            const interval = setInterval(() => {
                setProgress(p => {
                    if (p >= 100) {
                        clearInterval(interval);
                        handleScanComplete();
                        return 100;
                    }
                    return p + 10; // 10% every 300ms = 3 seconds total
                });
            }, 300);
            return () => clearInterval(interval);
        }
    }, [status]);

    const handleScanComplete = () => {
        setStatus('complete');
        
        // Mock finding an emotion. 
        // In a real app, frames would be sent to the backend.
        const mockEmotions = ['anxious', 'sad', 'neutral'];
        const detectedEmotion = mockEmotions[Math.floor(Math.random() * mockEmotions.length)];
        const mockInsight = `Micro-expressions indicate elevated stress markers around the ocular region. Tension mapped to ${detectedEmotion} profile.`;

        setTimeout(() => {
            stopCamera();
            onAnalysisComplete({ mood: detectedEmotion, insight: mockInsight });
        }, 2000); // Wait 2s to show success before closing
    };

    // --- Inline Styles ---
    const styles = {
        container: {
            background: '#1e293b',
            borderRadius: '16px',
            padding: '20px',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '15px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            position: 'relative',
            overflow: 'hidden'
        },
        videoBox: {
            width: '100%',
            maxWidth: '300px',
            height: '225px',
            background: 'black',
            borderRadius: '12px',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: status === 'scanning' ? '2px solid #3b82f6' : '2px solid #334155'
        },
        video: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: 'scaleX(-1)' // Mirror effect
        },
        overlay: {
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(59, 130, 246, 0.2)',
            display: status === 'scanning' ? 'flex' : 'none',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        },
        scannerLine: {
            width: '100%',
            height: '2px',
            background: '#60a5fa',
            boxShadow: '0 0 10px #60a5fa',
            animation: 'scan 2s linear infinite'
        },
        targetBox: {
            width: '120px',
            height: '120px',
            border: '2px dashed #93c5fd',
            borderRadius: '50%',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        },
        button: {
            padding: '10px 20px',
            borderRadius: '25px',
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.3s'
        }
    };

    return (
        <div style={styles.container}>
            {/* Embedded CSS for the scanning animation */}
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes scan {
                    0% { transform: translateY(-100px); }
                    50% { transform: translateY(100px); }
                    100% { transform: translateY(-100px); }
                }
            `}} />

            <div style={styles.videoBox}>
                {status === 'idle' && <Camera size={48} color="#64748b" />}
                {status === 'connecting' && <RefreshCw size={32} color="#94a3b8" className="spin" />}
                {status === 'error' && <div style={{ textAlign: 'center', color: '#f87171' }}><AlertCircle size={32} /><br/>Camera Blocked</div>}
                
                {(status === 'scanning' || status === 'complete') && (
                    <video ref={videoRef} autoPlay playsInline muted style={styles.video} />
                )}

                <div style={styles.overlay}>
                    <div style={styles.targetBox}></div>
                    <div style={styles.scannerLine}></div>
                </div>

                {status === 'complete' && (
                    <div style={{ position: 'absolute', background: 'rgba(22, 163, 74, 0.9)', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <CheckCircle size={48} color="white" />
                        <span style={{ marginTop: '10px', fontWeight: 'bold' }}>Facial Metrics Captured</span>
                    </div>
                )}
            </div>

            <div style={{ width: '100%', maxWidth: '300px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '5px', color: '#94a3b8' }}>
                    <span>{status === 'scanning' ? 'Analyzing focal points...' : status === 'complete' ? 'Analysis Complete' : 'Awaiting start...'}</span>
                    <span>{progress}%</span>
                </div>
                <div style={{ width: '100%', height: '6px', background: '#334155', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${progress}%`, height: '100%', background: status === 'complete' ? '#22c55e' : '#3b82f6', transition: 'width 0.3s ease' }}></div>
                </div>
            </div>

            {status === 'idle' || status === 'error' ? (
                <button style={styles.button} onClick={startCamera}>
                    <Camera size={18} /> Start Video Scan
                </button>
            ) : null}
            
        </div>
    );
};

export default VideoScanner;
