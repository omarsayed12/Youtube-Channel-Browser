import React, { useEffect, useState } from 'react';
import playIcon from '../../images/video-play.svg';
import './VideoCard.css'

const VideoCard = ({ video }) => {
    const [playing, setPlaying] = useState(false);
    const [notes, setNotes] = useState(video.note);

    useEffect(() => {
        const storedVideos = JSON.parse(localStorage.getItem('videos'));
        if (storedVideos?.length) {
            const updatedVideos = storedVideos.map((storedVideo) =>
                storedVideo.id.videoId === video.id.videoId
                    ? { ...storedVideo, note: notes }
                    : storedVideo
            );
            localStorage.setItem('videos', JSON.stringify(updatedVideos));
        }
    }, [notes, video.id]);

    useEffect(() => {
        setPlaying(false);
    }, [video.id]);

    useEffect(() => {
        setNotes(video.note);
    }, [video.note]);

    return (
        <div className='video-card'>
            <div className='video-poster-wrap'>
                {playing ? (
                    <iframe
                        width='100%'
                        height='100%'
                        src={`https://www.youtube.com/embed/${video.id.videoId}?autoplay=1`}
                        title={video.snippet.title}
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen
                    ></iframe>
                ) : (
                    <>
                        <img
                            className='video-poster'
                            src={video.snippet.thumbnails.high.url}
                            alt={video.snippet.title}
                        />
                        <img
                            onClick={() => setPlaying(true)}
                            className='play-icon'
                            src={playIcon}
                            alt={video.play}
                        />
                    </>
                )}
            </div>
            <div className='video-info-wrap'>
                <h3 title={video.snippet.title}>{video.snippet.title}</h3>
                <textarea
                    key={video.id.videoId}
                    className='note-textarea'
                    placeholder='Add a note...'
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                ></textarea>
            </div>
        </div>
    );
};

export default VideoCard;
