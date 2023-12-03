import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './memberList.css';

import Select from 'react-select';
import Button from '../Button/Button';
import Title from '../Title/Title';

const MemberList = ({ isOwner, setIsOwner, onMemberSelect }) => {
  const { id } = useParams();
  const [shoppingListMembers, setShoppingListMembers] = useState([]);
  const [otherMembers, setOtherMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [ownerInfo, setOwnerInfo] = useState({}); // New state for owner info

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        // Fetch members of the current shopping list
        const shoppingListMembersResponse = await axios.get(`http://localhost:3001/shoppingLists/${id}/members`);
        const shoppingListMembersData = shoppingListMembersResponse.data;

        setShoppingListMembers(shoppingListMembersData);

        // Fetch owner information
        const ownerResponse = await axios.get(`http://localhost:3001/shoppingLists/${id}/owners`);
        const ownerData = ownerResponse.data[0]; // Assuming there is only one owner
        setOwnerInfo(ownerData);

        // Fetch all members
        const allMembersResponse = await axios.get('http://localhost:3001/members');
        const allMembersData = allMembersResponse.data;

        // Filter out members that are already part of the shopping list
        const filteredMembers = allMembersData.filter(
          (member) => !shoppingListMembersData.some((listMember) => listMember.id === member.id)
        );

        setOtherMembers(filteredMembers.map((member) => ({ label: member.name, value: member })));
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

    fetchMembers();
  }, [id]);

  const handleAddMember = () => {
    if (isOwner && selectedMember) {
      // Add the selected member to the shopping list
      setShoppingListMembers([...shoppingListMembers, selectedMember.value]);

      // Remove the selected member from the list of other members
      setOtherMembers(otherMembers.filter((member) => member.value.id !== selectedMember.value.id));

      // Notify the parent component about the selected member
      onMemberSelect(selectedMember.value);
    }
  };

  const handleRemoveMember = (memberId) => {
    if (isOwner || memberId === ownerInfo.id) {
      // Remove the member from the shopping list
      setShoppingListMembers(shoppingListMembers.filter((member) => member.id !== memberId));

      // Add the member back to the list of other members
      const removedMember = shoppingListMembers.find((member) => member.id === memberId);
      setOtherMembers([...otherMembers, { label: removedMember.name, value: removedMember }]);

      // Notify the parent component about the removed member
      onMemberSelect(null);
    }
  };

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
          {shoppingListMembers.map((member) => (
            <li key={member.id}>
              {member.name}
              {(isOwner || member.id === ownerInfo.id) ? (
                <Button onClick={() => handleRemoveMember(member.id)} className="delete-button">
                  - Odebrat
                </Button>
              ) : null}
            </li>
          ))}
        </ul>
        {otherMembers.length > 0 && isOwner ? (
          <div>
            <Select
              value={selectedMember}
              onChange={setSelectedMember}
              options={otherMembers}
              placeholder="Vybrat člena"
              isDisabled={!isOwner}
            />
            <Button onClick={handleAddMember} className="toggle-button">
              + Přidat člena
            </Button>
          </div>
        ) : null}
        {otherMembers.length > 0 && selectedMember && !isOwner ? (
          otherMembers.some((member) => member.value.id === selectedMember.value.id) ? (
            <Button onClick={deleteSelf} className="delete-self-button">
              Odejít
            </Button>
          ) : null
        ) : null}
      </div>
    </div>
  );
};

export default MemberList;


