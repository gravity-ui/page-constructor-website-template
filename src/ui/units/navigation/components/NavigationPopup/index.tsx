import _ from 'lodash';
import block from 'bem-cn-lite';
import ReactDOM from 'react-dom';
import React, {Fragment, createRef, RefObject} from 'react';
import {OutsideClick} from '@gravity-ui/page-constructor';

import {NavigationLinkItem} from '../../../../../shared/models';
import NavigationItem from '../NavigationItem';

import './NavigationPopup.scss';

const b = block('navigation-popup');

export interface NavigationPopupProps {
    items: NavigationLinkItem[];
    onClose: () => void;
    left?: number;
    className?: string;
}

interface NavigationPopupState {
    calculatedLeft?: number;
}

export default class NavigationPopup extends React.Component<
    NavigationPopupProps,
    NavigationPopupState
> {
    ref: RefObject<HTMLDivElement> = createRef();
    state = {
        calculatedLeft: this.props.left,
    };

    componentDidMount() {
        this.calculateLeft();
        window.addEventListener('resize', this.calculateLeft);
    }

    componentDidUpdate(prevProps: NavigationPopupProps) {
        if (prevProps.left !== this.props.left) {
            this.calculateLeft();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.calculateLeft);
    }

    render() {
        if (!document || !document.body) {
            return null;
        }

        const {onClose} = this.props;
        const {calculatedLeft} = this.state;

        return ReactDOM.createPortal(
            <div ref={this.ref} className={b()} style={{left: calculatedLeft}}>
                <OutsideClick onOutsideClick={onClose}>{this.renderDefaultPopup()}</OutsideClick>
            </div>,
            document.body,
        );
    }

    private renderDefaultPopup() {
        return (
            <Fragment>
                {this.props.items.map((item) => (
                    <NavigationItem key={item.text} className={b('link')} data={item} />
                ))}
            </Fragment>
        );
    }

    // eslint-disable-next-line @typescript-eslint/member-ordering
    private calculateLeft = _.debounce(() => {
        const {left} = this.props;

        if (this.ref && this.ref.current && left) {
            const right = left + this.ref.current.offsetWidth;
            const docWidth = document.body.clientWidth;
            const calculatedLeft = right > docWidth ? left - (right - docWidth) : left;
            this.setState({calculatedLeft});
        } else {
            this.setState({calculatedLeft: left});
        }
    }, 100);
}
