import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Welcome To ProShop',
  description: 'We sell the best products for the cheapest prices',
  keywords: 'electronics, buy electronics, cheap electroincs',
};

export default Meta;
