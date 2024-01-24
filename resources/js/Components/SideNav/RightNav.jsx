import { Devider } from "../Devider/Devider";
import { FaBox, FaUser } from 'react-icons/fa';
import { Row } from "../Grid/Row";
import { RoundedCard } from "../Card/RoundedCard";
import SmallRoundedAvatar from "../Avatar/SmallRoundedAvatar";
import avatar2 from '../../../assets/img/avatars/avatar-2.jpeg';
import { Button } from "../Button/Button";

export const RightNav = () => {
    return (
        <div className="h-screen w-[600px] bg-white flex flex-col p-4">

            <div className='font-bold text-[18px] mb-2'> 
                Recent Transaction
            </div>
            <Row>
                <RoundedCard>
                    <div className='flex'>
                        <SmallRoundedAvatar altText={'avatar'} imageUrl={avatar2} className='mr-2'/>
                        <div className='mr-4'>
                            <div className='text-[14px]'>
                                Andik Aryanto 
                            </div>
                            <div className='text-[12px] text-gray'>
                                March 9th. 2023
                            </div>
                        </div>
                        <div className='my-auto mr-4 text-[14px]'>
                            $4,000
                        </div>
                        <div className='text-white my-auto bg-primary mr-4 px-2 rounded-2xl'>
                            asdasd
                        </div>
                        <div className='my-auto text-gray'>
                            <Button> . . .</Button>
                        </div>
                    </div>
                </RoundedCard>
                <RoundedCard>
                    <div className='flex'>
                        <SmallRoundedAvatar altText={'avatar'} imageUrl={avatar2} className='mr-2'/>
                        <div className='mr-4'>
                            <div className='text-[14px]'>
                                Andik Aryanto 
                            </div>
                            <div className='text-[12px] text-gray'>
                                March 9th. 2023
                            </div>
                        </div>
                        <div className='my-auto mr-4 text-[14px]'>
                            $4,000
                        </div>
                        <div className='text-white my-auto bg-primary mr-4 px-2 rounded-2xl'>
                            asdasd
                        </div>
                        <div className='my-auto text-gray'>
                            <Button> . . .</Button>
                        </div>
                    </div>
                </RoundedCard>
            </Row>
        </div>
    );
}