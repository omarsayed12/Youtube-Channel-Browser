import { useEffect, useState } from 'react';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Spinner from './components/spinner/Spinner';
import VideoList from './components/video-list/VideoList';

const BASE_URL = 'https://www.googleapis.com/youtube/v3';
const API_KEY = 'AIzaSyBu3zqec_4fox56XdXquCF5Xw4odocZDTY';

const App = () => {
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [videos, setVideos] = useState(JSON.parse(localStorage.getItem('videos')) || null);
    const [currentChannelId, setCurrentChannelId] = useState(JSON.parse(localStorage.getItem('channelId')) || '');

    const handleIncomingData = (items, refresh) => {
        let fetchedVideos;
        if (refresh) {
            const currentVideos = JSON.parse(localStorage.getItem('videos'));
            fetchedVideos = items.map((item, i) => {
                const storedItem = currentVideos.find(
                    (video) => video.id.videoId === item.id.videoId
                );
                if (storedItem) {
                    item.note = storedItem.note;
                    item.index = storedItem.index;
                } else {
                    item.note = '';
                    item.index = i;
                }
                return item;
            });
            fetchedVideos.sort((a, b) => a.index - b.index);
        } else {
            fetchedVideos = items.map((item, i) => {
                item.note = '';
                item.index = i;
                return item;
            });
        }
        setVideos(fetchedVideos);
    };

    const fetchVideos = async (channelId, refresh = false) => {
        try {
            setLoading(true);
            const response = await fetch(
                `${BASE_URL}/search?key=${API_KEY}&channelId=${channelId}&part=snippet,id&order=date&maxResults=50`
            );
            const data = await response.json();
            if (data.error) {
                setErrorMsg(data.error.message);
                setLoading(false);
            } else {
                setErrorMsg(null);
                handleIncomingData(data.items, refresh);
                setLoading(false);
                setCurrentChannelId(channelId);
            }
        } catch (err) {
            setLoading(false);
        }
    };

    const submitHandler = (channelId) => {
        if (localStorage.getItem('channelId') && localStorage.getItem('videos')) {
            const storedId = JSON.parse(localStorage.getItem('channelId'));
            if (channelId === storedId) {
                if (errorMsg) setErrorMsg(null);
                return;
            }
        }
        fetchVideos(channelId);
    };

    useEffect(() => {
        if (videos) {
            localStorage.setItem(
                'videos',
                JSON.stringify(videos.map((video, i) => ({ ...video, index: i })))
            );
        }
    }, [videos]);

    useEffect(() => {
        if (currentChannelId) {
            localStorage.setItem('channelId', JSON.stringify(currentChannelId));
        }
    }, [currentChannelId]);

    return (
        <div className='app'>
            <Header submitHandler={submitHandler} />
            <main>
                <section>
                    {loading ? (
                        <Spinner />
                    ) : (
                        <>
                            {errorMsg ? (
                                <p className='error-msg'>{errorMsg}</p>
                            ) : videos ? (
                                <VideoList
                                    videos={videos}
                                    setVideos={setVideos}
                                    fetchVideos={fetchVideos}
                                />
                            ) : (
                                <p className='search-text'>
                                    Search by channel id to get its videos.
                                </p>
                            )}
                        </>
                    )}
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default App;
