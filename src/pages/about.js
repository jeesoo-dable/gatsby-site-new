import React, { Component } from 'react';
import Layout from '../components/Layout';
import { Helmet } from 'react-helmet';
import favicon from '../favicon-96x96.png';

import './index.scss';

export default class About extends Component {
  render() {
    return (
      <>
        <Helmet
          title={`Puffin's devlog: About`}
          link={[{ rel: 'shortcut icon', href: `${favicon}` }]}
        />
        <Layout>
          <h3>whoami</h3>
          <p>서울에 살며 프로그래밍을 하는 홍지수입니다.</p>
          <p>
            패스트캠퍼스에서 프로그래밍 교육 프로덕트를 기획하는 일을 했습니다.
            좋은 교육 과정을 만들기 위해 개발 공부를 시작했다가, 그 공부가
            재밌어서 개발자가 되었습니다.
          </p>
          <p>
            프로그래밍, 그 중에서도 <em>웹 프론트엔드</em>에 매력을 느껴 공부를
            시작했습니다. 사용자와 맞닿는 지점에서 기술이 하는 역할에 관심이
            많습니다.
          </p>
          <p>
            개발자 부족과 개발 문화가 흥미롭습니다. 대학에서 문화인류학과
            과학기술사회학을 공부해서 그런가 봅니다. IT 분야에 오기 전에는
            방송국에서 다큐멘터리를 만들었고 로펌에 다니기도 했습니다.
          </p>
          <h3>skill</h3>
          <dl>
            <dt>Development:</dt>
            <dd>
              JavaScript(ES6+), HTML/CSS, Python, React.js, Git, Sass, Redux,
              Redux-thunk, React-router
            </dd>
            <dt>Others:</dt>
            <dd>(proficient)English</dd>
          </dl>
          <h3>others</h3>
          <ul>
            <li>jeesoo.hong at gmail com</li>
            <li>
              <a href="https://github.com/tinytinystone">github</a>
            </li>
            <li>
              <a href="https://www.facebook.com/jeesoo.hong">facebook</a>
            </li>
            <li>
              <a href="https://twitter.com/tinytinystone">twitter</a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/jeesoohong">linkedIn</a>
            </li>
          </ul>
          <h3>projects</h3>
          <dl>
            <dt>
              <a href="https://github.com/tinytinystone/fds-react-store">
                react/redux를 적용한 쇼핑몰 프로젝트(개인)
              </a>
            </dt>
            <dd>쇼핑몰</dd>
            <dt>
              <a href="https://github.com/tinytinystone/python-lecture-web-and-frontend">
                파이썬 웹 개발 올인원 패키지 강의(자료 및 스크립트)
              </a>
            </dt>
            <dd>강의</dd>
            <dt>
              <a href="" />
            </dt>
          </dl>
        </Layout>
      </>
    );
  }
}
