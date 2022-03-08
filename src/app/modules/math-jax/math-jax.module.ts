import { NgModule, ModuleWithProviders } from '@angular/core';
import { MathJaxService } from '@app/modules/math-jax/math-jax.service';
import { MathJaxDirective } from './math-jax.directive';
import { CommonModule } from '@angular/common';
import { GlobalService } from '@api/services/general.service';

/**
 * Module configuration class.
 *
 * @example
 *
 * {
 *   version: '2.7.5',
 *   config: 'TeX-AMS_HTML',
 *   hostname: 'cdnjs.cloudflare.com'
 * }
 */
export class ModuleConfiguration {
  /**
   * The version of the MathJax library.
   */
  version: string;

  /**
   * The config name of the MathJax library.
   * Please check the MathJax [documentation](https://docs.mathjax.org/en/latest/config-files.html) for all the configuration names.
   */
  config: string;

  /**
   * MathJax CDN hostname. Please check [here](https://docs.mathjax.org/en/latest/start.html#mathjax-cdn) for available CDN servers.
   */
  hostname: string;
}

@NgModule({
  exports: [MathJaxDirective],
  imports: [CommonModule],
  declarations: [MathJaxDirective],
})
export class MathJaxModule {
  MathJax: any;
  constructor(mathService: MathJaxService, moduleConfig?: ModuleConfiguration, public gs?: GlobalService) {
    mathService.init();
    /**
     * Define the **function string** to be inserted into the mathjax configuration script block.
     */
    this.MathJax = this.gs.nativeGlobal()['MathJax'];
    const mathJaxHubConfig = (() => {
      this.MathJax.Hub.Config({
        showMathMenu: false,
        showProcessingMessages: false,
        skipStartupTypeset: false,
        jax: ['input/TeX', 'output/CommonHTML'],
        tex2jax: {
          inlineMath: [
            ['$', '$'],
            ['\\(', '\\)'],
          ],
        },
      });
      this.MathJax.Hub.Register.StartupHook('End', () => {
        console.log('End');

        window.mathJaxHub$.next();
        window.mathJaxHub$.complete();
      });
    }).toString();

    if (moduleConfig) {
      /**
       * Insert the MathJax configuration script into the Head element.
       */
      (function () {
        const script = document.createElement('script') as HTMLScriptElement;
        script.type = 'text/x-mathjax-config';
        script.text = `(${mathJaxHubConfig})();`;
        document.getElementsByTagName('head')[0].appendChild(script);
      })();

      /**
       * Insert the script block to load the MathJax library.
       */
      (function (version: string, config: string, hostname: string) {
        const script = document.createElement('script') as HTMLScriptElement;
        script.type = 'text/javascript';
        // script.src = `https://${hostname}/ajax/libs/mathjax/${version}/MathJax.js?config=${config}`;
        script.src = `https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-AMS_HTML`;
        script.async = false;
        document.getElementsByTagName('head')[0].appendChild(script);
      })(moduleConfig.version, moduleConfig.config, moduleConfig.hostname);
    }
  }

  /**
   * Configure the module for the root module.
   *
   * @param moduleConfiguration A {ModuleConfiguration} instance.
   */
  public static forRoot(
    moduleConfiguration: ModuleConfiguration = {
      version: '2.7.5',
      config: 'TeX-AMS_HTML',
      hostname: 'cdnjs.cloudflare.com',
    },
  ): ModuleWithProviders<MathJaxModule> {
    return {
      ngModule: MathJaxModule,
      providers: [
        { provide: ModuleConfiguration, useValue: moduleConfiguration },
        { provide: MathJaxService, useClass: MathJaxService },
      ],
    };
  }

  /**
   * Configure the module for a child module.
   */
  public static forChild() {
    return {
      ngModule: MathJaxModule,
    };
  }
}
