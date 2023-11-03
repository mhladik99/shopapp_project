import React, { useState } from 'react';
import './memberList.css';

import Select from 'react-select';
import Button from '../Button/Button';
import Title from '../Title/Title';

const MemberList = ({ ownerInfo, isOwner, setIsOwner }) => {
  const existingMembers = [
    { id: 1, name: 'Michal Hladík', email: 'michal@seznam.cz' },
    { id: 2, name: 'Karel Kravčík', email: 'karel@seznam.cz' },
    { id: 3, name: 'Petra Novotná', email: 'petra@seznam.cz' },
    { id: 4, name: 'Tereza Rychlá', email: 'tereza@seznam.cz' },
  ];

  const [otherMembers, setOtherMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);

  const handleAddMember = () => {
    if (isOwner && selectedMember) {
      const isMemberAlreadyAdded = otherMembers.some(
        (member) => member.value.id === selectedMember.value.id
      );

      if (!isMemberAlreadyAdded) {
        setOtherMembers([...otherMembers, selectedMember]);
      }
    }
  };

  const handleRemoveMember = (memberId) => {
    if (isOwner || memberId === ownerInfo.id) {
      const updatedMembers = otherMembers.filter((member) => member.value.id !== memberId);
      setOtherMembers(updatedMembers);
    }
  };

  const options = existingMembers
    .map((member) => ({
      label: member.name,
      value: member,
    }))
    .filter(
      (option) =>
        !otherMembers.some((member) => member.value.id === option.value.id)
    );

  const toggleRole = (memberId) => {
    if (isOwner && memberId !== ownerInfo.id) {
      setIsOwner(false);
    } else {
      setIsOwner(true);
    }
  };

  const deleteSelf = () => {
    if (selectedMember) {
      const updatedMembers = otherMembers.filter((member) => member.value.id !== selectedMember.value.id);
      setOtherMembers(updatedMembers);
    }
  };

  return (
    <div>
      <h3 onClick={() => toggleRole(ownerInfo.id)}>{ownerInfo.name}</h3>
      <Title title="Členové" />
      <div className="container">
        <ul>
          {otherMembers.map((member, index) => (
            <li key={member.value.id}>
              <span
                onClick={() => {
                  toggleRole(member.value.id);
                  setSelectedMember(member);
                }}
                style={{ cursor: 'pointer' }}
              >
                {member.label}
              </span>
              {(isOwner || member.value.id === ownerInfo.id) ? (
                <Button
                  onClick={() => handleRemoveMember(member.value.id)}
                  className="delete-button"
                >
                  - Odebrat
                </Button>
              ) : null}
            </li>
          ))}
        </ul>
        {otherMembers.length > 0 && selectedMember && !isOwner ? (
          otherMembers.some(member => member.value.id === selectedMember.value.id) ? (
            <Button onClick={deleteSelf} className="delete-self-button">
              Odejít
            </Button>
          ) : null
        ) : null}
        {isOwner ? (
          <Select
            value={selectedMember}
            onChange={setSelectedMember}
            options={options}
            placeholder="Vybrat člena"
            isDisabled={!isOwner}
          />
        ) : null}
        {isOwner ? (
          <Button onClick={handleAddMember} className="toggle-button">
            + Přidat člena
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default MemberList;


