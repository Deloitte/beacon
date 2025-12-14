import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './SandboxIframe.module.css';

interface SandboxIframeProps {
  src: string;
  title: string;
  height?: string;
  githubPath?: string;
}

const GITHUB_REPO = 'https://github.com/Deloitte/beacon';
const GITHUB_BRANCH = 'main';
const GITHUB_BASE_PATH = 'docs/static';

export default function SandboxIframe({
  src,
  title,
  height = '600px',
  githubPath,
}: SandboxIframeProps): JSX.Element {
  const sourceUrl = useBaseUrl(src.startsWith('/') ? src : `/${src}`);
  
  // Derive GitHub path from src if not provided
  const githubFilePath = githubPath || src.replace(/^\//, '');
  const githubUrl = `${GITHUB_REPO}/blob/${GITHUB_BRANCH}/${GITHUB_BASE_PATH}/${githubFilePath}`;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h4>{title}</h4>
        <div className={styles.links}>
        <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.viewSource}
          >
            View Source
          </a>
        </div>
      </div>
      <iframe
        src={sourceUrl}
        title={title}
        className={styles.iframe}
        style={{ height }}
        loading="lazy"
      />
    </div>
  );
}

