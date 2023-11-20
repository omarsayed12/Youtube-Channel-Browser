import { ReactSortable } from 'react-sortablejs';
import VideoCard from '../video-card/VideoCard';
import './VideoList.css';

const VideoList = ({ videos, setVideos, fetchVideos }) => {
    const handleRefresh = () => {
        fetchVideos(JSON.parse(localStorage.getItem('channelId')), true);
    };

    const handleSort = (sortedList) => {
        const updatedVideos = sortedList.map((video, index) => ({...video, index}));
        setVideos(updatedVideos);
    };

    return (
        <div className='container'>
            <button
                className='refresh-btn'
                onClick={handleRefresh}
            >
                Refresh
            </button>
          
                {videos?.length > 0 ? (
                    <ReactSortable
                        group="videos"
                        animation={200}
                        list={videos}
                        setList={handleSort}
                        className='video-list'
                    >
                        {videos?.map((video, index) => (
                            <VideoCard
                                key={`v-${index}`}
                                video={{...video, index}}
                            />
                        ))}
                    </ReactSortable>
                ) : (
                    <p className='no-videos'>No videos available.</p>
                )}
            
        </div>
    );
};

export default VideoList;
