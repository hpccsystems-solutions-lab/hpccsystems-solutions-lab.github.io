import React from 'react';
import styled from 'styled-components';
import { colors } from 'utils/variables';
import { Heading, Paragraph, Box } from 'components/foundations';

const DocsContribution: React.SFC = ({edges, slug}) => (
    <Wrapper mt="xl" pt="xl">
    
    {edges && edges[0] != undefined ? 
    <React.Fragment>
    <Heading size={500} mt={0} mb="sm">
      Contributing to the Documentation
    </Heading>
      <Paragraph size={400}>
        Is something missing/incorrect? Please let us know by contacting{' '}
        <a href="mailto:info@hpccsystems.com" target="_blank" rel="noopener noreferrer">
          <strong>info@hpccsystems.com</strong>
        </a>{'. '}      
        If you know how to fix it straight away, don’t hesitate to{' '}
        <a href={edges[0].node.gitRemote.webLink+'/blob/'+edges[0].node.gitRemote.ref + slug.substring(0,slug.lastIndexOf('/'))+'.md'} target="_blank" rel="noopener noreferrer">
          Edit in Github repository
        </a>{' '}
        .
        
      </Paragraph> </React.Fragment>: ''}
  </Wrapper>
);

export default DocsContribution;

const Wrapper = styled(Box)`
  border-top: 1px solid ${colors.grey02};

  h2 {
    margin-top: 0;
  }
`;
