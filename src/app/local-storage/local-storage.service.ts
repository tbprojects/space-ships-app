import { Injectable } from '@angular/core';

export class LocalStorageConfig {
  prefix: string;

  constructor(attrs: LocalStorageConfig) {
    this.prefix = attrs.prefix || 'app';
  }
}

@Injectable()
export class LocalStorageService {
  constructor(private config: LocalStorageConfig) {}

  get(key: string): any {
    const value = localStorage.getItem(this.keyWithPrefix(key));
    return typeof(value) === 'string' ? JSON.parse(value) : value;
  }

  set(key: string, value: any): void {
    localStorage.setItem(this.keyWithPrefix(key), JSON.stringify(value));
  }

  private keyWithPrefix(key): string {
    if (!key) { throw new Error('Used empty key'); }
    return this.config.prefix + '-' + key;
  }
}
