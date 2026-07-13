import { useState } from 'react';
import FileItem from './components/FileExplorer/FileItem';
import FolderItem from './components/FileExplorer/FolderItem';
import PropertiesPanel from './components/PropertiesPanel/PropertiesPanel';
import fileSystemData from './data/data.json';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <div className="app">
      <div className="explorer-panel">
        {fileSystemData.map((item) =>
          item.type === 'folder' ? (
            <FolderItem
              key={item.id}
              name={item.name}
              items={item.children}
              selectedFile={selectedFile}
              onSelectFile={setSelectedFile}
            />
          ) : (
            <FileItem
              key={item.id}
              id={item.id}
              name={item.name}
              size={item.size}
              selectedFile={selectedFile}
              onSelectFile={setSelectedFile}
            />
          )
        )}
      </div>

      <PropertiesPanel file={selectedFile} />
    </div>
  );
}

export default App;