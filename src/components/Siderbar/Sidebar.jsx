import './Sidebar.css';
import SiderbarOption from './SiderbarOption/SiderbarOption';

import TwitterIcon from '@material-ui/icons/Twitter';
import HomeIcon from '@material-ui/icons/Home'; 
import SearchIcon from '@material-ui/icons/Search';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { Button } from '@material-ui/core';
import { useState } from 'react';
import {useRecoilState } from 'recoil';

export default function Siderbar({ size }) {

    const [screenSize, setScreenSize] = useRecoilState(size);

    return (
        <div className='sidebar'>
            
            {/* Twitter Icon */}
            <TwitterIcon className="sidebar__twitterIcon" />

            {/* SiderbarOption */}
            <SiderbarOption active text="Home" Icon={HomeIcon} />
            <SiderbarOption text="Explore" Icon={SearchIcon} />
            <SiderbarOption text="Notifications" Icon={NotificationsNoneIcon} />
            <SiderbarOption text="Messages" Icon={MailOutlineIcon} />
            <SiderbarOption text="Bookmarks" Icon={BookmarkBorderIcon} />
            <SiderbarOption text="Lists" Icon={ListAltIcon} />
            <SiderbarOption text="Profile" Icon={PermIdentityIcon} />
            <SiderbarOption text="More" Icon={MoreHorizIcon} />

            {/* Button -> Tweet */}
            {screenSize > 640 && <Button variant="outlined" className='sidebar__tweet' fullWidth>Tweet</Button>}
        </div>
    );
};
