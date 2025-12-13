import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import React from 'react';

export default function Home(): JSX.Element {
  return (
    <Layout
      title="Beacon Documentation"
      description="Modern packaging to support the foundation for first-party web analytics"
    >
      <main className="container margin-vert--lg">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <div className="text--center margin-bottom--xl">
              <h1 className="hero__title">Beacon</h1>
              <p className="hero__subtitle">
                Modern packaging to support the foundation for first-party web analytics
              </p>
              <div className="margin-top--lg">
                <Link
                  className="button button--primary button--lg margin--sm"
                  to={useBaseUrl('/docs/intro')}
                >
                  Get Started
                </Link>
                <Link
                  className="button button--secondary button--lg margin--sm"
                  to={useBaseUrl('/docs/examples')}
                >
                  View Examples
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

