/** @type {AppTypes.Config} */
window.config = {
  routerBasename: null,
  extensions: [],
  modes: [],
  showStudyList: true,
  maxNumberOfWebWorkers: 3,
  showLoadingIndicator: true,
  showWarningMessageForCrossOrigin: true,
  showCPUFallbackMessage: true,
  strictZSpacingForVolumeViewport: true,
  defaultDataSourceName: 'ohif',
  modesConfiguration: {
    '@ohif/mode-basic': {
      routes: {
        $set: [
          {
            path: 'basic',
            layoutTemplate: () => ({
              id: '@ohif/extension-default.layoutTemplateModule.viewerLayout',
              props: {
                leftPanels: ['@ohif/extension-default.panelModule.seriesList'],
                leftPanelResizable: true,
                rightPanels: [
                  'proposal-demo-extension.panelModule.proposalDemoPanel',
                  '@ohif/extension-cornerstone.panelModule.panelSegmentation',
                  '@ohif/extension-cornerstone.panelModule.panelMeasurement',
                ],
                rightPanelClosed: false,
                rightPanelResizable: true,
                viewports: [
                  {
                    namespace: '@ohif/extension-cornerstone.viewportModule.cornerstone',
                    displaySetsToDisplay: [
                      '@ohif/extension-default.sopClassHandlerModule.stack',
                      '@ohif/extension-dicom-video.sopClassHandlerModule.dicom-video',
                      '@ohif/extension-cornerstone.sopClassHandlerModule.DicomMicroscopySopClassHandler',
                    ],
                  },
                  {
                    namespace: '@ohif/extension-cornerstone-dicom-sr.viewportModule.dicom-sr',
                    displaySetsToDisplay: [
                      '@ohif/extension-cornerstone-dicom-sr.sopClassHandlerModule.dicom-sr',
                      '@ohif/extension-cornerstone-dicom-sr.sopClassHandlerModule.dicom-sr-3d',
                    ],
                  },
                  {
                    namespace: '@ohif/extension-dicom-pdf.viewportModule.dicom-pdf',
                    displaySetsToDisplay: ['@ohif/extension-dicom-pdf.sopClassHandlerModule.dicom-pdf'],
                  },
                ],
              },
            }),
          },
        ],
      },
    },
  },
  dataSources: [
    {
      namespace: '@ohif/extension-default.dataSourcesModule.dicomweb',
      sourceName: 'ohif',
      configuration: {
        friendlyName: 'AWS S3 Static wado server',
        name: 'aws',
        wadoUriRoot: 'https://d14fa38qiwhyfd.cloudfront.net/dicomweb',
        qidoRoot: 'https://d14fa38qiwhyfd.cloudfront.net/dicomweb',
        wadoRoot: 'https://d14fa38qiwhyfd.cloudfront.net/dicomweb',
        qidoSupportsIncludeField: false,
        imageRendering: 'wadors',
        thumbnailRendering: 'wadors',
        enableStudyLazyLoad: true,
        supportsFuzzyMatching: true,
        supportsWildcard: false,
        staticWado: true,
        singlepart: 'bulkdata,video',
        omitQuotationForMultipartRequest: true,
        bulkDataURI: {
          enabled: true,
          relativeResolution: 'studies',
          transform: url => url.replace('/pixeldata.mp4', '/rendered'),
        },
      },
    }
  ],
};
