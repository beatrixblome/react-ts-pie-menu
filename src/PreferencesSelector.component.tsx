import React from 'react';
import { ThemeProvider } from 'styled-components';
import { connectTheme } from 'styled-components-theme-connector';
import { compose, withProps, withContext, getContext } from 'recompose';
import PropTypes from 'prop-types';


// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {

//   faMars,
//   faNeuter,
//   faTransgender,
//   faVenus,
//   faBath,
//   faPlane,
//   faShower,
//   faStreetView,
//   faSubway,
// } from '@fortawesome/free-solid-svg-icons';
// import {
//   faCcAmazonPay,
//   faCcAmex,
//   faCcApplePay,
//   faCcDiscover,
//   faCcMastercard,
//   faCcPaypal,
//   faCcVisa,
//   faEthereum,
//   faGoogleWallet,
// } from '@fortawesome/free-brands-svg-icons';
import * as styles from './PreferenceSelector.style';

const List = connectTheme('pieMenu.list')('ul');

const Item = compose(
  withContext(
    itemTypes,
    ({ startAngle, endAngle, skew }) => ({ startAngle, endAngle, skew }),
  ),
  connectTheme('pieMenu.item'),
)('li');

export const PieCenter = connectTheme('pieMenu.center')('div');


// export type Context = {
//   radius: string,
//   centerRadius: string,
//   centralAngle: number,
//   polar: boolean, // eslint-disable-line react/no-unused-prop-types
// };

export const itemTypes = {
  startAngle: PropTypes.number,
  endAngle: PropTypes.number,
  skew: PropTypes.number,
};

const ContentContainer = connectTheme('slice.contentContainer')('div');
const Content = connectTheme('slice.content')('div');

const PieMenu = ({
  className,
  radius,
  centerRadius,
  centralAngle,
  startOffsetAngle = 0,
  polar,
  Center = PieCenter,
  slices,
  attrs = {},
}) => {
  const deltaAngle = 90 - centralAngle;
  const startAngle = polar ? 45 : startOffsetAngle + deltaAngle + (centralAngle / 2);
  return (
    <div className={className} {...attrs}>
      <List radius={radius}>
        {slices.map((slice, i) => (
          <Item
            key={i.toString()}
            startAngle={startAngle}
            endAngle={centralAngle * i}
            skew={polar ? 0 : deltaAngle}
            centralAngle={centralAngle}
          >
            {slice}
          </Item>
        ))}
      </List>
      <Center centerRadius={centerRadius} />
    </div>
  );
};

const Slice = ({
  className,
  radius,
  centerRadius,
  contentHeight = '2em',
  centralAngle,
  endAngle,
  onMouseOver,
  onMouseOut,
  onSelect,
  onFocus,
  onBlur,
  children,
  attrs = {},
}) => (
  <div
    role="button"
    className={className}
    onMouseOver={onMouseOver}
    onMouseOut={onMouseOut}
    onMouseUp={onSelect}
    onFocus={onFocus}
    onBlur={onBlur}
    tabIndex={-1}
    {...attrs}
  >
    <ContentContainer
      radius={radius}
      centralAngle={centralAngle}
      centerRadius={centerRadius}
      contentHeight={contentHeight}
    >
      <Content angle={endAngle}>
        {children}
      </Content>
    </ContentContainer>
  </div>
);


const theme = {
  pieMenu: {
    container: styles.container,
    center: styles.center,
  },
  slice: {
    container: styles.slice,
  },
};

const INITIAL = 0;
const DATATYPE = 1;
const DATASIZE = 2;
const DOWNLOAD = 3;

export default class ReactPieMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datatype: null,
      size: null,
      download: null,
      choice: 0,
    };
  }

  showDataType = () => {
    this.setState({ choice: DATATYPE });
  }

  selectDataType = datatype => () => {
    this.setState({ datatype });
  }

  showDataSize = () => {
    this.setState({ choice: DATASIZE });
  }

  selectDataSize = datasize => () => {
    this.setState({ datasize });
  }

  showDownload = () => {
    this.setState({ choice: DOWNLOAD });
  }

  selectDownload = download => () => {
    this.setState({ download });
  }

  goBack = () => {
    const { choice } = this.state;
    if (choice === INITIAL) return;
    this.setState({ choice: INITIAL });
  }

  render() {
    const { datatype, datasize, download, choice } = this.state;
    const Center = props => (
      <PieCenter {...props} onClick={this.goBack}>
        {choice !== 0 && <div  size="2x" />}
      </PieCenter>
    );
    return (
      <ThemeProvider theme={theme}>
        <PieMenu centerRadius="30px" Center={Center}>
          {choice === 0 && (
            <React.Fragment>
              <Slice onSelect={this.showDataType} attrs={{ filled: `${datatype != null}` }}>
                <div icon={datatype ||"Dateiformat"} size="2x" />
              </Slice>
              <Slice onSelect={this.showDataSize} attrs={{ filled: `${datasize != null}` }}>
                <div icon={datasize || "DateiGrösse"} size="2x" />
              </Slice>
              <Slice onSelect={this.showDownload} attrs={{ filled: `${download != null}` }}>
                <div icon={download || "Download"} size="2x" />
              </Slice>
            </React.Fragment>
          )}
          {choice === DATATYPE && (
            <React.Fragment>
              Dateiformat
              <Slice
                onSelect={this.selectDataType("Original")}
                attrs={{ active: `${datatype === "Original"}` }}
              >
                <div backgroundColor={"red"} size="2x" />
              </Slice>
              <Slice
                onSelect={this.selectDataType("")}
                attrs={{ active: `${datatype === "75%"}` }}
              >
                <div backgroundColor={"blue"} size="2x" />
              </Slice>
              {/* <Slice
                onSelect={this.selectDataType(faPlane)}
                attrs={{ active: `${datatype === faPlane}` }}
              >
                <div icon={faPlane} size="2x" />
              </Slice>
              <Slice
                onSelect={this.selectDataType(faPlane)}
                attrs={{ active: `${datatype === faPlane}` }}
              >
                <div icon={faPlane} size="2x" />
              </Slice> */}
            </React.Fragment>
          )}
          {choice === DATASIZE && (
            <React.Fragment>
              DateiGrösse
              <Slice
                onSelect={this.selectDataSize("100%")}
                contentHeight="66px"
                attrs={{ active: `${datasize === "100%"}` }}
              >
                <div>
                  {/* <div icon={"100%"} size="2x" /> */}
                  <p>
                    {'100%'}
                  </p>
                </div>
              </Slice>
              <Slice
                onSelect={this.selectDataSize("75%")}
                contentHeight="66px"
                attrs={{ active: `${datasize === "75%"}` }}
              >
                <div>
                  {/* <div icon={"75%"} size="2x" /> */}
                  <p>
                    {'75%'}
                  </p>
                </div>
              </Slice>
              {/* <Slice
                onSelect={this.selectDataSize(faNeuter)}
                contentHeight="66px"
                attrs={{ active: `${datasize === faNeuter}` }}
              >
                <div>
                  <div icon={faNeuter} size="2x" />
                  <p>
                    {'50%'}
                  </p>
                </div>
              </Slice>
              <Slice
                onSelect={this.selectDataSize(faNeuter)}
                contentHeight="66px"
                attrs={{ active: `${datasize === faNeuter}` }}
              >
                <div>
                  <div icon={faNeuter} size="2x" />
                  <p>
                    {'33%'}
                  </p>
                </div>
              </Slice>
              <Slice
                onSelect={this.selectDataSize(faMars)}
                contentHeight="66px"
                attrs={{ active: `${datasize === faMars}` }}
              >
                <div>
                  <div icon={faMars} size="2x" />
                  <p>
                    {'25%'}
                  </p>
                </div>
              </Slice>
              <Slice
                onSelect={this.selectDataSize(faMars)}
                contentHeight="66px"
                attrs={{ active: `${datasize === faMars}` }}
              >
                <div>
                  <div icon={faMars} size="2x" />
                  <p>
                    {'10%'}
                  </p>
                </div>
              </Slice> */}
            </React.Fragment>
          )}
          {choice === DOWNLOAD && (
            <React.Fragment>
              Download
              <Slice
                onSelect={this.selectDownload("download")}
                attrs={{ active: `${download === "download"}` }}
              >
                {/* <div icon={faBath} /> */}
              </Slice>

            </React.Fragment>
          )}
        </PieMenu>
      </ThemeProvider>
    );
  }
}