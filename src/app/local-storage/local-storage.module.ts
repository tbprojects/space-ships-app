import { ModuleWithProviders, NgModule } from '@angular/core';
import { LocalStorageConfig, LocalStorageService } from './local-storage.service';

@NgModule()
export class LocalStorageModule {
  static forRoot(config?: LocalStorageConfig): ModuleWithProviders<LocalStorageModule> {
    return {
      ngModule: LocalStorageModule,
      providers: [
        LocalStorageService,
        {provide: LocalStorageConfig, useValue: config}
      ]
    };
  }
}
