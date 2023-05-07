class EventTarget {
  constructor() {
    this.listeners = new Map();
  }

  addEventListener(type, callback) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, []);
    }

    const typeListeners = this.listeners.get(type);

    if (!typeListeners.some(listener => listener === callback)) {
      typeListeners.push(callback);
    }
  }

  removeEventListener(type, callback) {
    if (this.listeners.has(type)) {
      const typeListeners = this.listeners.get(type);
      const index = typeListeners.findIndex(listener => listener === callback);
      if (index !== -1) {
        typeListeners.splice(index, 1);
      }
    }
  }

  dispatchEvent(event) {
    if (this.listeners.has(event)) {
      const typeListeners = this.listeners.get(event);
      typeListeners.forEach(listener => listener());
    }
  }
}
