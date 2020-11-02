interface WakeLock {
  released: boolean;
  release(): void;
}

interface Navigator {
  wakeLock: {
    request(type: 'screen'): Promise<WakeLock>;
  };
}
