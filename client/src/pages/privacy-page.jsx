import React,{ useEffect } from 'react'
import Layout from '../components/layout/Layout'
import LegalContents from '../components/features/LegalContents'
import FeaturesStore from '../store/FeaturesStore'

const PrivacyPage = () => {

  const { LegalDetailsRequest } = FeaturesStore();

  useEffect(() => {
    (async () => {
      await LegalDetailsRequest("privacy");
    })();
  }, []);

  return (
    <Layout>
      <LegalContents />
    </Layout>
  )
}

export default PrivacyPage