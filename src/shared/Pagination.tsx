import * as React from 'react';
import Icon from '@app/modules/client/shared/layout/Icon';

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

const range = (from: number, to: number, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

interface IPaginationProps {
  totalRecords?: number;
  pageLimit?: number;
  pageNeighbours?: number;
  onPageChanged?: Function;
  currentPage?: number;
  autoLoad?: boolean;
}

interface IPaginationStates {
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  pageLimit: number;
  pageNeighbours: number;
  isInit: boolean;
}

class Pagination extends React.Component<IPaginationProps, IPaginationStates> {
  constructor(props) {
    super(props);
    this.state = {
      totalPages: 0,
      totalRecords: 1,
      pageLimit: 20,
      pageNeighbours: 2,
      currentPage: 1,
      isInit: false,
    }
  }

  componentDidMount() {
    this.init(this.props)
  }

  componentDidUpdate(preProps) {
    if (preProps.totalRecords !== this.props.totalRecords) {
      this.init(this.props)
    }
  }

  init = (props) => {
    let totalRecords = props.totalRecords
    let pageLimit = props.pageLimit
    let pageNeighbours = props.pageNeighbours

    pageLimit = typeof pageLimit === 'number' ? pageLimit : 30;
    totalRecords = typeof totalRecords === 'number' ? totalRecords : 0;

    // pageNeighbours can be: 0, 1 or 2
    pageNeighbours = typeof pageNeighbours === 'number'
      ? Math.max(0, Math.min(pageNeighbours, 2))
      : 0;

    const totalPages = Math.ceil(totalRecords / pageLimit);

    this.setState({
      totalPages,
      totalRecords,
      pageLimit,
      pageNeighbours,
      currentPage: this.props.currentPage ? this.props.currentPage : 1,
    }, () => {
      if (!this.state.isInit) {
        this.setState({
          isInit: true,
        }, () => {
          if (this.props.autoLoad) {
            this.props.onPageChanged({
              currentPage: this.props.currentPage ? this.props.currentPage : 1,
            })
          }
        })
      }
    })
  }

  gotoPage = (page: number) => {
    const { onPageChanged = f => f } = this.props

    const currentPage = Math.max(0, Math.min(page, this.state.totalPages));

    const paginationData = {
      currentPage,
      totalPages: this.state.totalPages,
      pageLimit: this.state.pageLimit,
      totalRecords: this.state.totalRecords,
    };

    this.setState({ currentPage }, () => onPageChanged(paginationData));
  }

  handleClick = (page: number) => {
    this.gotoPage(page);
  }

  handleMoveLeft = () => {
    this.gotoPage(this.state.currentPage - (this.state.pageNeighbours * 2) - 1);
  }

  handleMoveRight = () => {
    this.gotoPage(this.state.currentPage + (this.state.pageNeighbours * 2) + 1);
  }

  fetchPageNumbers = () => {

    const totalPages = this.state.totalPages;
    const currentPage = this.state.currentPage;
    const pageNeighbours = this.state.pageNeighbours;

    /**
     * totalNumbers: the total page numbers to show on the control
     * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
     */
    const totalNumbers = (this.state.pageNeighbours * 2) + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {

      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);

      let pages = range(startPage, endPage, 1);

      const hasLeftSpill = startPage > 2;
      const hasRightSpill = (totalPages - endPage) > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      switch (true) {
        // handle: (1) < {5 6} [7] {8 9} (10)
        case (hasLeftSpill && !hasRightSpill): {
          const extraPages = range(startPage - spillOffset, startPage - 1, 1);
          pages = [LEFT_PAGE, ...extraPages, ...pages];
          break;
        }

        // handle: (1) {2 3} [4] {5 6} > (10)
        case (!hasLeftSpill && hasRightSpill): {
          const extraPages = range(endPage + 1, endPage + spillOffset, 1);
          pages = [...pages, ...extraPages, RIGHT_PAGE];
          break;
        }

        // handle: (1) < {4 5} [6] {7 8} > (10)
        case (hasLeftSpill && hasRightSpill):
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }

      return [1, ...pages, totalPages];

    }

    return range(1, totalPages, 1);

  }
  render() {
    if (!this.state.totalRecords || this.state.totalPages === 1) return null;

    const { currentPage } = this.state;
    const pages = this.fetchPageNumbers();

    return (
      <>
        <nav aria-label="Countries Pagination">
          <ul className="pagination">
            { pages.map((page, index) => {

              if (page === LEFT_PAGE) {

                return (
                <li
                  onClick={this.handleMoveLeft}
                  key={index}
                  className="page-item">
                  <span className="page-link"
                    aria-label="Previous">
                    <Icon name="chevron-left"/>
                  </span>
                </li>
                );
              }

              if (page === RIGHT_PAGE) {

                return (
                <li key={index} className="page-item" onClick={this.handleMoveRight}>
                  <span className="page-link"
                      aria-label="Next">
                    <Icon name="chevron-right"/>
                  </span>
                </li>
                );
              }

              return (
                <li
                  onClick={() => this.handleClick(page) }
                  key={index} className={`page-item${ currentPage === page ? ' active' : ''}`}>
                  <span className="page-link">{ page }</span>
                </li>
              );

            }) }

          </ul>
        </nav>
      </>
    )
  }
}

export { range, IPaginationProps };
export default Pagination;
