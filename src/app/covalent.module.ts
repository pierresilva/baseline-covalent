import { NgModule } from '@angular/core';
import { CovalentCommonModule } from '@covalent/core/common';
import { CovalentLayoutModule } from '@covalent/core/layout';
import { CovalentStepsModule } from '@covalent/core/steps';
import { CovalentMediaModule } from '@covalent/core/media';
import { CovalentDialogsModule } from '@covalent/core/dialogs';
import { CovalentLoadingModule } from '@covalent/core/loading';
import { CovalentSearchModule } from '@covalent/core/search';
import { CovalentPagingModule } from '@covalent/core/paging';
import { CovalentNotificationsModule } from '@covalent/core/notifications';
import { CovalentMessageModule } from '@covalent/core/message';
import { CovalentMenuModule } from '@covalent/core/menu';
import { CovalentExpansionPanelModule } from '@covalent/core/expansion-panel';
import { CovalentDataTableModule } from '@covalent/core/data-table';
import { CovalentFileModule } from '@covalent/core/file';
import { CovalentBreadcrumbsModule } from '@covalent/core/breadcrumbs';
import { CovalentDynamicMenuModule } from '@covalent/core/dynamic-menu';
import { CovalentGuidedTourModule } from '@covalent/guided-tour';
import { CovalentChipsModule } from '@covalent/core/chips';
import { CovalentTabSelectModule } from '@covalent/core/tab-select';
import { CovalentTextEditorModule } from '@covalent/text-editor';
import { CovalentJsonFormatterModule } from '@covalent/core/json-formatter';
import { CovalentCodeEditorModule } from '@covalent/code-editor';
import { CovalentMarkdownNavigatorModule } from '@covalent/markdown-navigator';
import { CovalentFlavoredMarkdownModule } from '@covalent/flavored-markdown';
import { CovalentHttpModule } from '@covalent/http';
import { CovalentHighlightModule } from '@covalent/highlight';
import { CovalentMarkdownModule } from '@covalent/markdown';
import { CovalentDynamicFormsModule } from '@covalent/dynamic-forms';
import { CovalentBaseEchartsModule } from '@covalent/echarts/base';

@NgModule({
  imports: [CovalentHttpModule.forRoot()],
  exports: [
    CovalentCommonModule,
    CovalentLayoutModule,
    CovalentStepsModule,
    CovalentMediaModule,
    CovalentDialogsModule,
    CovalentLoadingModule,
    CovalentSearchModule,
    CovalentPagingModule,
    CovalentNotificationsModule,
    CovalentMessageModule,
    CovalentMenuModule,
    CovalentExpansionPanelModule,
    CovalentDataTableModule,
    CovalentFileModule,
    CovalentBreadcrumbsModule,
    CovalentDynamicMenuModule,
    CovalentGuidedTourModule,
    CovalentChipsModule,
    CovalentTabSelectModule,
    CovalentTextEditorModule,
    // (optional) Additional Covalent Modules imports
    CovalentJsonFormatterModule,
    CovalentCodeEditorModule,
    CovalentMarkdownNavigatorModule,
    CovalentFlavoredMarkdownModule,
    CovalentHttpModule,
    CovalentHighlightModule,
    CovalentMarkdownModule,
    CovalentDynamicFormsModule,
    CovalentBaseEchartsModule,
  ],
})
export class CovalentModule {}
