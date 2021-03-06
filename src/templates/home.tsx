import React from 'react';
import styled from 'styled-components';
import { space } from 'utils/variables';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import { RouteComponentProps } from '@reach/router';

import { Page } from 'components/layout/Page';

import { Container } from 'components/layout/Container';
import { DocsWrapper } from 'components/docs/DocsWrapper';
import { DocsHeader } from 'components/docs/DocsHeader';
import MarkdownContent from 'components/page/Markdown/MarkdownContent';

import { MenuNode, Edge } from 'interfaces/nodes';
import { Footer, FooterWrapper } from 'components/layout/Footer';
import IndexLayout from 'layouts';
import renderAst from 'utils/renderAst';
import { SiteMetadata } from 'interfaces/gatsby';
import { DocsContribution } from 'components/docs/DocsContribution';

import illustration from 'assets/images/LXN409 Water_Cycle_v5_nolabels-01-x3byj0.jpg';

interface HomeTemplateProps extends RouteComponentProps {
  data: {
    site: {
      siteMetadata: SiteMetadata;
    };
    sectionList: {
      edges: Edge<MenuNode>[];
    };
    markdownRemark: {
      htmlAst: any;
      excerpt: string;
      frontmatter: {
        id: string;
        title: string;
        description?: string;
      };
    };
  };
}

const HomepageIllustration = styled('img')`
  margin-bottom: ${space.xl}px;
`;

const HomeTemplate: React.SFC<HomeTemplateProps> = ({ data }) => {
  const { markdownRemark, site } = data;
  const { frontmatter } = markdownRemark;
  const { siteMetadata } = site;

  return (
    <IndexLayout>
      <Page docsPage>
        <Helmet>
          <meta property="og:title" content="Home" />
        </Helmet>
        <DocsWrapper>
          <Container>
            <HomepageIllustration src={illustration} alt="HPCCSystems" />
            <DocsHeader title={frontmatter.title} subtitle={frontmatter.description} margin="md" />
            <MarkdownContent>{renderAst(markdownRemark.htmlAst)}</MarkdownContent>
            <DocsContribution />
            <FooterWrapper>
              <Footer
                version={siteMetadata.version}
                siteLastUpdated={siteMetadata.siteLastUpdated}
                socials={siteMetadata.socials}
              />
            </FooterWrapper>
          </Container>
        </DocsWrapper>
      </Page>
    </IndexLayout>
  );
};

export default HomeTemplate;

export const query = graphql`
  query HomeTemplateQuery($slug: String!) {
    site {
      siteMetadata {
        title
        sidebarTitle
        sidebarSubtext
        siteLastUpdated
        description
        version
        siteUrl
        keywords
        author {
          name
          url
          email
        }
        socials {
          name
          imgpath
          url
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      htmlAst
      excerpt
      frontmatter {
        id
        title
        description
      }
    }
  }
`;
