import { useEffect, useState, useRef } from 'react';
import styles from './Collapse.module.css';

function Collapse({ isOpen, children, baseHeight }) {
  const child = useRef(null);
  const [childHeight, setChildHeight] = useState(0);

  useEffect(() => {
    let value = child.current.offsetHeight;
    setChildHeight(value ? value : baseHeight);
  }, []);

  return (
    <div className={styles.collapsible} style={{
        maxHeight: isOpen ? childHeight : 0
      }}>
      <div ref={child}>
          {children}
      </div>
    </div>
  );
}

export default Collapse