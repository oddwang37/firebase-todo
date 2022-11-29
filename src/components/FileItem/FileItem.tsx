import React, { FC } from 'react';
import './styles.less';

import { FileIcon, DownloadIcon } from 'components/svg';

const FileItem: FC<FileItemProps> = ({ url, name, contentType, fullPath }) => {
  const formatTitle = () => (name.length > 45 ? name.slice(0, 45) + '...' : name);


  return (
    <div className="file-item">
      {contentType && contentType.includes('image') ? (
        <div>
          <img src={url} className="img" />
          <div className="image-footer">
            <div>{formatTitle()}</div>
            <a href={url} className="download-link" target="_blank">
              <DownloadIcon />
            </a>
          </div>
        </div>
      ) : (
        <div className="no-image-wrapper">
          <FileIcon />
          <div className="flex-wrapper">
            <div>{formatTitle()}</div>
            <a href={url} className="download-link" target="_blank" rel="noreferrer">
                <DownloadIcon />
            </a>
          </div>
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
