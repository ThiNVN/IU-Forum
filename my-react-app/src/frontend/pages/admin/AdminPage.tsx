import React, { useState } from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Menu as MenuIcon,
  People as PeopleIcon,
  Category as CategoryIcon,
  Topic as TopicIcon,
  Comment as CommentIcon,
  LocalOffer as TagIcon,
  Group as ClubIcon,
  Event as ActivityIcon,
  Notifications as NotificationIcon,
  AttachFile as FileIcon,
  ThumbUp as LikeIcon,
  Forum as ThreadIcon,
} from '@mui/icons-material';
import UserManagement from '../../components/admin/UserManagement';
import CategoryManagement from '../../components/admin/CategoryManagement';
import TopicManagement from '../../components/admin/TopicManagement';
import TagManagement from '../../components/admin/TagManagement';
import FileManagement from '../../components/admin/FileManagement';
import NotificationManagement from '../../components/admin/NotificationManagement';
import ActivityManagement from '../../components/admin/ActivityManagement';
import ClubManagement from '../../components/admin/ClubManagement';
import CommentManagement from '../../components/admin/CommentManagement';
import ThreadManagement from '../../components/admin/ThreadManagement';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const AdminPage: React.FC = () => {
  const [open, setOpen] = useState(true);
  const [selectedEntity, setSelectedEntity] = useState('users');

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const menuItems = [
    { id: 'users', label: 'Users', icon: <PeopleIcon /> },
    { id: 'categories', label: 'Categories', icon: <CategoryIcon /> },
    { id: 'topics', label: 'Topics', icon: <TopicIcon /> },
    { id: 'threads', label: 'Threads', icon: <ThreadIcon /> },
    { id: 'comments', label: 'Comments', icon: <CommentIcon /> },
    { id: 'tags', label: 'Tags', icon: <TagIcon /> },
    { id: 'clubs', label: 'Clubs', icon: <ClubIcon /> },
    { id: 'activities', label: 'Activities', icon: <ActivityIcon /> },
    { id: 'notifications', label: 'Notifications', icon: <NotificationIcon /> },
    { id: 'files', label: 'Files', icon: <FileIcon /> },
    { id: 'likes', label: 'Likes', icon: <LikeIcon /> },
  ];

  const renderEntityManagement = () => {
    switch (selectedEntity) {
      case 'users':
        return <UserManagement />;
      case 'categories':
        return <CategoryManagement />;
      case 'topics':
        return <TopicManagement />;
      case 'threads':
        return <ThreadManagement />;
      case 'tags':
        return <TagManagement />;
      case 'clubs':
        return <ClubManagement />;
      case 'activities':
        return <ActivityManagement />;
      case 'notifications':
        return <NotificationManagement />;
      case 'files':
        return <FileManagement />;
      case 'comments':
        return <CommentManagement />;
      default:
        return <Typography>Select an entity to manage</Typography>;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.id}
              selected={selectedEntity === item.id}
              onClick={() => setSelectedEntity(item.id)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </Box>
      </Drawer>
      <Main open={open}>
        <Toolbar />
        {renderEntityManagement()}
      </Main>
    </Box>
  );
};

export default AdminPage; 