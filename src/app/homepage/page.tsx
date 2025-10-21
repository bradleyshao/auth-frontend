'use client';

import { Card } from 'antd';
import { useRouter } from 'next/navigation';

interface CardItem {
  id: string;
  name: string;
  description: string;
  route: string;
}

interface HomePageProps {
  cards?: CardItem[]; // 预留从props获取卡片数据的接口
}

import { useAuthStore } from '@/store/authStore';

export default function HomePage({ cards }: HomePageProps) {
  const router = useRouter();
  const { user } = useAuthStore();
  
  // 默认卡片数据
  const defaultCards: CardItem[] = [
    { id: '1', name: '卡片1', description: '卡片内容1', route: '/card1' },
    { id: '2', name: '卡片2', description: '卡片内容2', route: '/card2' },
    { id: '3', name: '卡片3', description: '卡片内容3', route: '/card3' },
    { id: '4', name: '卡片4', description: '卡片内容4', route: '/card4' },
    { id: '5', name: '卡片5', description: '卡片内容5', route: '/card5' }
  ];
  
  // 根据用户权限过滤卡片
  const filteredCards = (cards || defaultCards).filter(card => {
    // 如果没有用户信息，不显示任何卡片
    if (!user) return false;
    
    // 如果用户没有access权限或access为空对象，显示所有卡片（默认权限）
    if (!user.access || Object.keys(user.access).length === 0) {
      return true;
    }
    
    // 检查用户是否有访问该卡片的权限
    return Object.values(user.access).includes(card.id) || 
           Object.values(user.access).includes(card.route.replace('/', ''));
  });

  const displayCards = filteredCards;

  const handleCardClick = (route: string) => {
    router.push(route);
  };

  return (
    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
      <div className="grid grid-cols-3 gap-4 mb-4">
        {filteredCards.map((card) => (
          <Card 
            key={card.id} 
            title={card.name}
            hoverable
            onClick={() => handleCardClick(card.route)}
          >
            <p>{card.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}