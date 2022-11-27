import React from 'react';
import { Event } from '@merc/react-timeline';

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

}

export const BlockEvent = ({ date, text, marker, card, className }: BlockEventProps) => {

  return (
    <Event
      className={joinClassNames(['text-event', className])}
      date={date}
      marker={marker}
      card={card}
    >
      <div style={{
        minHeight: "100px"
      }}>
        <h2>Txn: </h2>
        <h2>Txn: </h2>
        
      </div>
    </Event>
  );
}