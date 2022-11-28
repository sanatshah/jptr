import React from 'react';
import { Event } from '@merc/react-timeline';
import { Link } from 'react-router-dom';
import { Page } from '@homenode/jscore/dist/apps/blockbook/Blockbook';

export const joinClassNames = (classNames) => {
  return classNames
    .filter(x => {
      try {
        return x.trim();
      } catch (err) {
        return x;
      }
    })
    .join(' ');
}

interface BlockEventProps {
  date: string
  text: string
  marker?: any
  children?: React.ReactNode,
  className?: string,
  card?: any,
  page: Page,
}

export const BlockEvent = ({ date, text, marker, card, className, page }: BlockEventProps) => {
  console.log("page: ", page)
  return (
    <Link to={`/post/${page.id}`}>
      <Event
        className={joinClassNames(['text-event', className])}
        date={date}
        marker={marker}
        card={card}
      >
        <div style={{
          minHeight: "100px",
          width: "100%"
        }}>
          <p style={{ color: "wheat"}}>Txn: {"0xcb271a9f0aac23988d61e1926f5c7bd8729fc74158efc2b18da41ba1309bf9ad".substring(0,40)}...</p>
          <div style={{ width: "100%", height: "1px", marginTop: "8px", marginBottom: "8px", backgroundColor: "wheat" }}/>
          <div style={{
            marginTop: '8px'
          }}>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore </p>
          </div>
        </div>
      </Event>
    </Link>
  );
}