import { LocalStorageConfig, LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    const config = new LocalStorageConfig({prefix: 'test'});
    service = new LocalStorageService(config);
  });

  describe('get', () => {
    it('should get value from localstorage', () => {
      spyOn(localStorage, 'getItem').and.returnValue('{"test":true}');
      const result = service.get('param');

      expect(localStorage.getItem).toHaveBeenCalledWith('test-param');
      expect(result).toEqual({test: true});
    });

    it('should throw error when key is not provided', () => {
      expect(() => service.get('')).toThrowError();
    });
  });

  describe('set', () => {
    it('should set value in localstorage', () => {
      spyOn(localStorage, 'setItem');
      service.set('param', {test: true});

      expect(localStorage.setItem).toHaveBeenCalledWith('test-param', '{"test":true}')
    });
  });
});
