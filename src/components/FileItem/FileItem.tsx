import React, { FC } from 'react';
import './styles.less';

import { FileIcon } from 'components/svg';

const FileItem: FC<FileItemProps> = ({ url, name, contentType, fullPath }) => {
  const formatTitle = () => (name.length > 22 ? name.slice(0, 22) + '...' : name);

  return (
    <div className="file-item">
      {contentType && contentType.includes('image') ? (
        <div>
          <img src={url} className="img" />
          <div>{formatTitle()}</div>
          <a href={url} className="download-link" target="_blank">
            Download full
          </a>
        </div>
      ) : (
        <div className="no-image-wrapper">
          <div>
            <FileIcon />
            <a href={url} className="download-link" target="_blank" rel="noreferrer">
              Download
            </a>
          </div>
          <div>{formatTitle()}</div>
        </div>
      )}
    </div>
  );
};

export default FileItem;

type FileItemProps = {
  url?: string;
  name: string;
  contentType?: string;
  fullPath: string;
};
