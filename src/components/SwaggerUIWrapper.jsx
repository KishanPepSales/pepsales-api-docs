import React, { useEffect, useRef } from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

/**
 * Enhanced Swagger UI Wrapper with modern styling and Docusaurus integration
 * 
 * Props:
 *  - specUrl: string (path or URL to openapi json/yaml)
 *  - specObj: object (optional) - directly pass OpenAPI object
 */
export default function SwaggerUIWrapper({ specUrl, specObj, ...rest }) {
  const swaggerRef = useRef(null);

  // Priority: specObj (object) > specUrl (URL string)
  const swaggerProps = specObj ? { spec: specObj } : { url: specUrl };

  useEffect(() => {
    // Auto-scroll to first endpoint on load
    if (swaggerRef.current) {
      const timer = setTimeout(() => {
        const firstEndpoint = swaggerRef.current?.querySelector('.opblock');
        if (firstEndpoint) {
          firstEndpoint.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="swagger-ui-wrapper" ref={swaggerRef}>
      <SwaggerUI
        {...swaggerProps}
        {...rest}
        deepLinking={true}
        displayOperationId={false}
        defaultModelsExpandDepth={1}
        defaultModelExpandDepth={1}
        docExpansion="list"
        filter={true}
        showExtensions={true}
        showCommonExtensions={true}
        tryItOutEnabled={true}
        requestInterceptor={(request) => {
          // Add any default headers or modify requests here
          return request;
        }}
        responseInterceptor={(response) => {
          // Process responses if needed
          return response;
        }}
      />
    </div>
  );
}

