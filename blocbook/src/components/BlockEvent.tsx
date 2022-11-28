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
          minHeight: "100px"
        }}>
          <p style={{ color: "wheat"}}>Txn: {"0xcb271a9f0aac23988d61e1926f5c7bd8729fc74158efc2b18da41ba1309bf9ad".substring(0,40)}...</p>
          <p >To: 0xaba2636d95a6d5288eae5d41bb95f5daf00bb8aa</p>
          <p>From: 0xc0275b8a47c7c135da234ed9542d8ae3900829e0</p>
          <div style={{
            marginTop: '8px'
          }}>
            <p>Content here</p>
          </div>
        </div>
      </Event>
    </Link>
  );
}