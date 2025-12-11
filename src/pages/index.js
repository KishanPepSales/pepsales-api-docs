import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="API Documentation"
      description="Comprehensive API documentation with interactive examples and guides">
      <div className="bg-gradient-to-br from-[var(--ifm-color-primary)] to-[var(--ifm-color-primary-dark)] py-16 text-white">
        <div className="container">
          <div className="row">
            <div className="col col--8 col--offset-2">
              <h1 className="text-5xl font-bold mb-4 mt-0">{siteConfig.title}</h1>
              <p className="text-xl opacity-90 mb-8">
                Build powerful applications with our comprehensive REST API. 
                Get started in minutes with interactive documentation, code examples, and detailed guides.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link
                  className="px-8 py-3 rounded-lg font-semibold transition-all duration-200 border-2 border-white bg-white text-[var(--ifm-color-primary)] hover:bg-transparent hover:text-white hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
                  to="/docs/intro">
                  Get Started
                </Link>
                <Link
                  className="px-8 py-3 rounded-lg font-semibold transition-all duration-200 border-2 border-white bg-transparent text-white hover:bg-white hover:text-[var(--ifm-color-primary)]"
                  to="/docs/reference/api-reference">
                  View API Reference
                </Link>
              </div>
              <div className="mt-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-sm">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span>All systems operational</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container py-16">
        <div className="row">
          <div className="col col--10 col--offset-1">
            <h2 className="text-center mb-12">Quick Links</h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 my-12">
              <Link to="/docs/guides/authentication" className="p-6 rounded-lg bg-[var(--ifm-background-surface-color)] border border-[var(--ifm-color-emphasis-300)] transition-all duration-200 block no-underline text-[var(--ifm-font-color-base)] hover:border-[var(--ifm-color-primary)] hover:shadow-md hover:-translate-y-0.5 hover:no-underline hover:text-[var(--ifm-font-color-base)]">
                <h3 className="mt-0 text-[var(--ifm-color-primary)]">🔐 Authentication</h3>
                <p>Learn how to authenticate your API requests and manage tokens securely.</p>
              </Link>
              <Link to="/docs/reference/api-reference" className="p-6 rounded-lg bg-[var(--ifm-background-surface-color)] border border-[var(--ifm-color-emphasis-300)] transition-all duration-200 block no-underline text-[var(--ifm-font-color-base)] hover:border-[var(--ifm-color-primary)] hover:shadow-md hover:-translate-y-0.5 hover:no-underline hover:text-[var(--ifm-font-color-base)]">
                <h3 className="mt-0 text-[var(--ifm-color-primary)]">📚 API Reference</h3>
                <p>Explore all available endpoints with interactive documentation and examples.</p>
              </Link>
              <Link to="/docs/guides/errors" className="p-6 rounded-lg bg-[var(--ifm-background-surface-color)] border border-[var(--ifm-color-emphasis-300)] transition-all duration-200 block no-underline text-[var(--ifm-font-color-base)] hover:border-[var(--ifm-color-primary)] hover:shadow-md hover:-translate-y-0.5 hover:no-underline hover:text-[var(--ifm-font-color-base)]">
                <h3 className="mt-0 text-[var(--ifm-color-primary)]">⚠️ Error Handling</h3>
                <p>Understand error responses and implement robust error handling in your app.</p>
              </Link>
              <Link to="/docs/guides/rate-limits" className="p-6 rounded-lg bg-[var(--ifm-background-surface-color)] border border-[var(--ifm-color-emphasis-300)] transition-all duration-200 block no-underline text-[var(--ifm-font-color-base)] hover:border-[var(--ifm-color-primary)] hover:shadow-md hover:-translate-y-0.5 hover:no-underline hover:text-[var(--ifm-font-color-base)]">
                <h3 className="mt-0 text-[var(--ifm-color-primary)]">⚡ Rate Limits</h3>
                <p>Learn about API usage limits and best practices for managing requests.</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="row mt-16">
          <div className="col col--8 col--offset-2">
            <div className="p-8 bg-[var(--ifm-background-surface-color)] rounded-lg border border-[var(--ifm-color-emphasis-300)]">
              <h3 className="mt-0">Getting Started</h3>
              <p>
                New to the API? Start with our <Link to="/docs/intro">Introduction</Link> page 
                and then follow the <Link to="/docs/guides/authentication">Authentication Guide</Link> 
                to make your first authenticated request.
              </p>
              <p>
                For detailed endpoint documentation, check out the{' '}
                <Link to="/docs/reference/api-reference">Interactive API Reference</Link> where 
                you can test endpoints directly from your browser.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
