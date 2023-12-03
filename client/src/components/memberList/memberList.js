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
  const [ownerInfo, setOwnerInfo] = useState({});

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

        // Filter out members that are already part of the shopping list
        const allMembersResponse = await axios.get('http://localhost:3001/members');
        const allMembersData = allMembersResponse.data;
        
        const uniqueEmails = new Set();
        const filteredMembersData = allMembersData.filter((member) => {
          if (!uniqueEmails.has(member.email)) {
            uniqueEmails.add(member.email);
            return true;
          }
          return false;
        });
        
        // Filter out members that are already part of the shopping list
        const filteredMembers = filteredMembersData.filter(
          (member) => !shoppingListMembersData.some((listMember) => listMember.email === member.email)
        );
        
        setOtherMembers(filteredMembers.map((member) => ({ label: member.name, value: member })));
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

    fetchMembers();
  }, [id]);

  const handleAddMember = async () => {
    if (isOwner && selectedMember) {
      try {
        const { name, email } = selectedMember.value;
  
        // Make a POST request to add the selected member to the shopping list
        const response = await axios.post(`http://localhost:3001/shoppingLists/${id}/members`, {
          name,
          email,
        });
  
        // Handle the response accordingly
        if (response.status === 200 || response.status === 201) {
          const addedMember = response.data;
  
          // Update the state with the actual response data
          setShoppingListMembers((prevMembers) => [...prevMembers, addedMember]);
  
          // Remove the selected member from the list of other members based on email
          setOtherMembers((prevOtherMembers) =>
            prevOtherMembers.filter((member) => member.value.email !== addedMember.email)
          );
  
          // Notify the parent component about the selected member
          onMemberSelect(addedMember);
  
          // Clear the selected member after successful addition
          setSelectedMember(null);
        } else {
          console.error('Failed to add member to the shopping list. Status:', response.status);
        }
      } catch (error) {
        console.error('Error adding member:', error.message);
      }
    }
  };

  const handleRemoveMember = async (memberId) => {
    try {
      // Make a DELETE request to remove the product from the shopping list
      await axios.delete(`http://localhost:3001/shoppingLists/${id}/members/${memberId}`);
  
      // Update the state by removing the deleted product
      setShoppingListMembers((prevMembers) => prevMembers.filter((member) => member.id !== memberId));
    } catch (error) {
      console.error('Error deleting product:', error);
      // Handle error, e.g., show an error message to the user
    }
  };
  
  const toggleRole = (memberEmail) => {
    if (isOwner && memberEmail !== ownerInfo.email) {
      setIsOwner(false);
    } else {
      setIsOwner(true);
    }
  };

  return (
    <div>
      <h3 onClick={() => toggleRole(ownerInfo.email)}>{ownerInfo.name}</h3>
      <Title title="Členové" />
      <div className="container">
        <ul>
          {shoppingListMembers.map((member) => (
            <li key={member.email}>
              {member.name}
              {(isOwner || member.email === "michal@seznam.cz") ? (
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
      </div>
    </div>
  );
};

export default MemberList;


