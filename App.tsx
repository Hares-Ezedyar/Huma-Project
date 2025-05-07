import { useState } from 'react';
import ServerList from './components/ServerList';
import ChannelList from './components/ChannelList';
import ChannelContent from './components/ChannelContent';

// Mock data for development
const mockArticles = [
  {
    id: '1',
    source: {
      name: 'BBC Persian',
      icon: 'BBC',
    },
    timestamp: 'Today at 2:30 PM',
    title: 'تحولات سیاسی جدید در افغانستان',
    content: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.',
    reactions: {
      likes: 24,
      dislikes: 3,
    },
    originalLink: 'https://www.bbc.com/persian/articles/example',
  },
  {
    id: '2',
    source: {
      name: 'AFP News',
      icon: 'AFP',
    },
    timestamp: 'Today at 1:15 PM',
    title: 'گزارش جدید از وضعیت اقتصادی افغانستان',
    content: 'کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد.',
    reactions: {
      likes: 42,
      dislikes: 7,
    },
    originalLink: 'https://www.afp.com/articles/example',
  },
  {
    id: '3',
    source: {
      name: 'New York Times',
      icon: 'NYT',
    },
    timestamp: 'Today at 11:30 AM',
    title: 'گزارش تحلیلی از وضعیت امنیتی در شمال افغانستان',
    content: 'در این شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.',
    reactions: {
      likes: 8,
      dislikes: 15,
    },
    originalLink: 'https://www.nytimes.com/articles/example',
    isQuarantined: true,
  },
];

const mockModerationLogs = [
  {
    id: '1',
    timestamp: 'Today at 3:45 PM',
    hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    reason: 'Matched regex pattern [طالبان]',
  },
  {
    id: '2',
    timestamp: 'Today at 2:12 PM',
    hash: '7d793037a0760186574b0282f2f435e7',
    reason: 'Matched regex pattern [داعش]',
  },
];

function App() {
  const [activeServer, setActiveServer] = useState('humapress');
  const [activeChannel, setActiveChannel] = useState('breaking-news');

  return (
    <div className="flex h-screen bg-discord-tertiary text-discord-text">
      <ServerList activeServer={activeServer} onServerChange={setActiveServer} />
      <ChannelList activeChannel={activeChannel} onChannelChange={setActiveChannel} />
      <ChannelContent 
        channelId={activeChannel} 
        articles={mockArticles}
        moderationLogs={mockModerationLogs}
      />
    </div>
  );
}

export default App;
