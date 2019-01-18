import React, { Component } from 'react';
import { graphql } from 'gatsby';

import './index.scss';

import Layout from '../components/Layout';
import List from '../components/List';

import 'normalize.css';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { data } = this.props;
    return (
      <Layout>
        <List edges={data.allMarkdownRemark.edges} />
      </Layout>
    );
  }
}

export const query = graphql`
  query HomepageQuery {
    allFile(filter: { extension: { eq: "png" } }) {
      edges {
        node {
          publicURL
        }
      }
    }
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          frontmatter {
            title
            path
            date
            excerpt
            image
          }
        }
      }
    }
  }
`;

export default App;
