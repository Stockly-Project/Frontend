

// Web Worker에서는 DOM에 접근하지 못하므로, 메인 스레드와 통신하기 위해 postMessage 사용
self.onmessage = (event) => {
    const { dataUrl } = event.data;
  
    const eventSource = new EventSource(dataUrl);
  
    eventSource.onmessage = (event) => {
      const newDataArray = JSON.parse(event.data);
      self.postMessage(newDataArray); // 처리된 데이터를 메인 스레드에 전달
    };
  
    eventSource.onerror = () => {
      console.error('Web Worker: SSE connection error');
      eventSource.close();
    };
  };
  