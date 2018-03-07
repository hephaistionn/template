import './style.scss';
import React from 'react';
import Reflux from 'reflux';
import { StoreMember, actionsMember } from '../../../stores/member';
import { StoreMain } from '../../../stores/main';
import CardMember from './cardMember';

class ViewMembers extends Reflux.Component {

    constructor(props) {
        super(props);
        this.stores = [StoreMember, StoreMain];
    }

    componentDidMount() {
        actionsMember.get();
    }


    render() {
        const members = this.state.members;
        const session = this.state.session;

        const items = members.filter(member => member._id !== session._id)
            .map((member, index) => <CardMember
                key={member._id}
                className='members__grid__item'
                member={member} key={member._id+index} />);

        for (let i = 0; i < 10; i++) {
            items.push(<div className='members__grid__item-empty' key={i} />)
        }

        const state = location.pathname.split('/')[2] ? 'optional'  : '';

        return (
            <div className={`members ${state}`}>
                <div className='members__grid'>
                    {items}
                </div>
            </div>
        );
    }
}

export default ViewMembers;  