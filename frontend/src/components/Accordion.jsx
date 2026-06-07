import { useState } from 'react';
import { IconPlus, IconMinus } from './Icons';

export function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="accordion">
      {items.map((item, index) => {
        const open = openIndex === index;

        return (
          <article className={`accordion__item ${open ? 'accordion__item--open' : ''}`} key={item.question}>
            <button className="accordion__trigger" type="button" onClick={() => setOpenIndex(open ? -1 : index)}>
              <span>{item.question}</span>
              {open ? <IconMinus className="accordion__icon" /> : <IconPlus className="accordion__icon" />}
            </button>
            {open ? <div className="accordion__content">{item.answer}</div> : null}
          </article>
        );
      })}
    </div>
  );
}
