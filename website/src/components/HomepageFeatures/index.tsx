import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Dashboard',
    Svg: require('@site/static/img/dashboard.svg').default,
    description: (
      <>
        Access both your public and private data.
      </>
    ),
  },
  {
    title: 'Protect your account',
    Svg: require('@site/static/img/account-protection.svg').default,
    description: (
      <>
          Get your account protected by our<br />
          Logion Legal Officers.
      </>
    ),
  },
  {
    title: 'Protect your transactions',
    Svg: require('@site/static/img/transaction-protection.svg').default,
    description: (
      <>
        Protect your most valuable digital assets.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
