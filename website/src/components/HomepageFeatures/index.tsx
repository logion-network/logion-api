import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import Link from "@docusaurus/Link";
import IntroImg from "@site/static/img/intro.png";
import TransactionProtectionImg from "@site/static/img/transaction-protection.png";
import AccountProtectionImg from "@site/static/img/account-protection.png";

type FeatureItem = {
  title: JSX.Element;
  ImgSrc: string;
  description: JSX.Element;
  link: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: <>First steps</>,
    ImgSrc: IntroImg,
    description: (
      <>
        Learn about logion architecture and SDK installation.
      </>
    ),
    link: "/docs/intro",
  },
  {
    title: <>Digital Asset Generation Protection <br/>for Marketplace and token providers with the Legal Officer Case (LOC)</>,
    ImgSrc: TransactionProtectionImg,
    description: (
      <ul>
        <li>System of evidence record with online certificate:
        Token/NFT underlying assets and documentation existence certification, process execution logs record (for digital, monetary, physical assets)</li>
        <li>Zero-knowledge proof infrastructure (content is not revealed) for all underlying asset related files, securely archived (private IPFS) with possible future access under strict access rules.</li>
        <li>Exclusive restricted delivery of digital asset(s) to NFT owner</li>
      </ul>
    ),
    link: "/docs/client/loc",
  },
  {
    title: <>Digital Wallet Protection API <br/>for Digital Wallet providers</>,
    ImgSrc: AccountProtectionImg,
    description: (
      <ul>
        <li>Social recovery service: to answer to password loss situation</li>
        <li>Multisig service: to avoid any unwanted asset transfer as high-value asset transfer requires Legal Officer signature</li>
      </ul>
    ),
    link: "/docs/client/protection",
  },
];

function Feature({title, ImgSrc, description, link}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className={clsx("text--center", styles.featureImageContainer)}>
        <Link to={ link }><img src={ImgSrc} className={styles.featureSvg} /></Link>
      </div>
      <div className="text--center padding-horiz--md">
        <h3><Link to={ link } className={styles.featureLink}>{title}</Link></h3>
        <p className="text--left"><Link to={ link } className={styles.featureLink}>{description}</Link></p>
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
