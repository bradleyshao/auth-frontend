'use client';

import { Card } from 'antd';
import { useRouter } from 'next/navigation';
import { 
  DashboardOutlined, 
  UserOutlined, 
  SettingOutlined, 
  FileTextOutlined,
  BarChartOutlined
} from '@ant-design/icons';

interface CardItem {
  id: string;
  name: string;
  description: string;
  route: string;
  icon: React.ReactNode;
  color: string;
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
    { 
      id: '1', 
      name: '智能助手', 
      description: 'AI聊天机器人，为您提供智能问答服务', 
      route: '/card1',
      icon: <DashboardOutlined style={{ fontSize: '24px' }} />,
      color: '#1890ff'
    },
    { 
      id: '2', 
      name: '数据分析', 
      description: '查看详细的数据统计和分析报告', 
      route: '/card2',
      icon: <BarChartOutlined style={{ fontSize: '24px' }} />,
      color: '#52c41a'
    },
    { 
      id: '3', 
      name: '文档管理', 
      description: '管理和查看您的文档资料', 
      route: '/card3',
      icon: <FileTextOutlined style={{ fontSize: '24px' }} />,
      color: '#faad14'
    },
    { 
      id: '4', 
      name: '系统设置', 
      description: '配置系统参数和个性化设置', 
      route: '/card4',
      icon: <SettingOutlined style={{ fontSize: '24px' }} />,
      color: '#f5222d'
    },
    { 
      id: '5', 
      name: '用户中心', 
      description: '管理用户信息和权限设置', 
      route: '/card5',
      icon: <UserOutlined style={{ fontSize: '24px' }} />,
      color: '#722ed1'
    }
  ];
  
  // 根据用户权限过滤卡片
  const filteredCards = (cards || defaultCards).filter(card => {
    // 如果没有用户信息，不显示任何卡片
    if (!user) return false;
    
    // 如果用户没有access权限或access为空对象，不显示任何卡片
    if (!user.access || Object.keys(user.access).length === 0) {
      return false;
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
    <div style={{ 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '40px 32px', 
      minHeight: 'calc(100vh - 48px)',
      borderRadius: '16px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* 移动的紫色背景元素 */}
      <div className="floating-blob floating-blob-1" style={{ top: '5%', left: '5%' }}></div>
      <div className="floating-blob floating-blob-2" style={{ top: '55%', right: '10%' }}></div>
      <div className="floating-blob floating-blob-3" style={{ bottom: '15%', left: '15%' }}></div>
      <div className="floating-blob floating-blob-4" style={{ top: '25%', right: '25%' }}></div>
      <div className="floating-blob floating-blob-5" style={{ bottom: '5%', right: '5%' }}></div>
      
      <div style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ 
          fontSize: '32px', 
          fontWeight: '700', 
          color: '#1a1a1a',
          margin: '0 0 12px 0',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          欢迎回来，{user?.username}！
        </h1>
        <p style={{ 
          fontSize: '16px', 
          color: '#6b7280',
          margin: 0,
          fontWeight: '400'
        }}>
          选择下方功能模块开始使用
        </p>
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: filteredCards.length === 1 ? '1fr' : 'repeat(2, 1fr)',
        gap: '24px',
        maxWidth: filteredCards.length === 1 ? '600px' : '1200px',
        width: '100%'
      }}>
        {filteredCards.map((card) => (
          <Card 
            key={card.id}
            hoverable
            onClick={() => handleCardClick(card.route)}
            style={{
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              border: 'none',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              overflow: 'hidden',
              background: 'white',
              position: 'relative'
            }}
            bodyStyle={{
              padding: '28px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.12)';
              // 箭头动画
              const arrow = e.currentTarget.querySelector('.card-arrow') as HTMLElement;
              if (arrow) {
                arrow.style.transform = 'translateX(4px)';
              }
              // 图标动画
              const icon = e.currentTarget.querySelector('.card-icon') as HTMLElement;
              if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
              // 箭头动画
              const arrow = e.currentTarget.querySelector('.card-arrow') as HTMLElement;
              if (arrow) {
                arrow.style.transform = 'translateX(0)';
              }
              // 图标动画
              const icon = e.currentTarget.querySelector('.card-icon') as HTMLElement;
              if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
              }
            }}
          >
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '120px',
              height: '120px',
              background: `linear-gradient(135deg, ${card.color}15 0%, ${card.color}05 100%)`,
              borderRadius: '0 0 0 100px',
              pointerEvents: 'none'
            }} />
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              marginBottom: '20px',
              position: 'relative',
              zIndex: 1
            }}>
              <div 
                className="card-icon"
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '14px',
                  background: `linear-gradient(135deg, ${card.color} 0%, ${card.color}dd 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '16px',
                  color: 'white',
                  boxShadow: `0 4px 12px ${card.color}40`,
                  transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                {card.icon}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#1a1a1a',
                  margin: '0 0 6px 0',
                  letterSpacing: '-0.02em'
                }}>
                  {card.name}
                </h3>
              </div>
            </div>
            <p style={{
              fontSize: '15px',
              color: '#6b7280',
              lineHeight: '1.6',
              margin: '0 0 20px 0',
              position: 'relative',
              zIndex: 1
            }}>
              {card.description}
            </p>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'relative',
              zIndex: 1
            }}>
              <span style={{
                fontSize: '14px',
                color: card.color,
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                立即使用
                <span 
                  className="card-arrow"
                  style={{ 
                    fontSize: '16px',
                    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    display: 'inline-block'
                  }}
                >
                  →
                </span>
              </span>
            </div>
          </Card>
        ))}
      </div>
      
      {filteredCards.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '80px 20px',
          color: '#6b7280',
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
        }}>
          <div style={{ 
            fontSize: '64px', 
            marginBottom: '20px',
            filter: 'grayscale(0.3)'
          }}>
            📋
          </div>
          <h3 style={{ 
            fontSize: '20px', 
            margin: '0 0 8px 0',
            color: '#1a1a1a',
            fontWeight: '600'
          }}>
            暂无可用功能
          </h3>
          <p style={{ 
            fontSize: '15px', 
            margin: 0,
            color: '#6b7280'
          }}>
            请联系管理员为您分配相应权限
          </p>
        </div>
      )}
      </div>
    </div>
  );
}