import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useNotification } from '../NotificationContext.js';
import './shoppingDetail.css';

import EditableTitle from '../components/editableTitle/editableTitle';
import Title from '../components/Title/Title';
import ShoppingList from '../components/shoppingList/shoppingList';
import Button from '../components/Button/Button';
import MemberList from '../components/memberList/memberList';
import BackButton from '../components/backButton/backButton';
import ConfirmationDialog from '../components/confirmationDialog/confirmationDialog';
import NotificationBar from '../components/notificationBar/notificationBar';
import ProductCompletionChart from '../components/productCompletionChart/productCompletionChart.js';
import { useLanguage } from '../LanguageContext';
import { ShoppingListProvider } from '../ShoppingListContext';

const ShoppingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [shoppingList, setShoppingList] = useState(null);
  const [ownerInfo, setOwnerInfo] = useState(null);
  const [isOwner, setIsOwner] = useState(true);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const { language } = useLanguage();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch shopping list details using Axios
        const shoppingListResponse = await axios.get(`http://localhost:3001/shoppingLists/${id}`);
        const fetchedShoppingList = shoppingListResponse.data;
  
        // Fetch owner info from the specified endpoint
        const ownerInfoResponse = await axios.get(`http://localhost:3001/shoppingLists/${id}/owners`);
        const fetchedOwner = ownerInfoResponse.data[0];
  
        // Update state with fetched data
        setShoppingList(fetchedShoppingList);
        setOwnerInfo({
          id: fetchedOwner.id,
          name: fetchedOwner.name,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [id]);

  const handleOwnerTitleClick = () => {
    if (!selectedMember) {
    }
  };

  const handleMemberNameClick = (isOwnerClick) => {
    setIsOwner(isOwnerClick);
  };

  const handleArchivovatClick = async () => {
    if (!selectedMember) {
      try {
        const newArchivedState = !shoppingList.archived;

        await axios.patch(`http://localhost:3001/shoppingLists/${id}`, {
          archived: newArchivedState,
        });

        setShoppingList((prevShoppingList) => ({
          ...prevShoppingList,
          archived: newArchivedState,
        }));
      } catch (error) {
        console.error('Error updating shopping list:', error);
      }
    }
  };

  const handleSmazatClick = () => {
    if (!selectedMember) {
      setDeleteDialogOpen(true);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/shoppingLists/${id}`);
      setShoppingList(null);

      showNotification(language === 'cs' ? <p>Nákupní seznam byl smazán.</p> : <p>The shopping list has been deleted.</p>);

      navigate('/');

    } catch (error) {
      console.error('Error deleting shopping list:', error);
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
  };

  const handleMemberSelect = (member) => {
    setSelectedMember(member);
  };

  return (
    <ShoppingListProvider>
    <div className="shopping-detail-container">
      <div className="top-section">
        <div className="member-names">
          <span className="owner-name" onClick={() => handleMemberNameClick(true)}>
            Petr Krátký
          </span>
          <span className="member-name" onClick={() => handleMemberNameClick(false)}>
            Michal Hladík
          </span>
        </div>
        <BackButton />
        <EditableTitle
  isOwner={isOwner}
  title={shoppingList ? shoppingList.name : ''}
  onTitleChange={(newTitle) => {
    setShoppingList((prevShoppingList) => ({
      ...prevShoppingList,
      name: newTitle,
    }));
  }}
  shoppingListId={id}
  onClick={handleOwnerTitleClick}
/>
      </div>
      <div className="left-section">
        <Title title={language === 'cs' ? <p>Položky</p> : <p>Items</p>} />
        <ShoppingList />
      </div>
      <div className="right-section">
        <Title title={language === 'cs' ? <p>Vlastník</p> : <p>Owner</p>} />
        <MemberList ownerInfo={ownerInfo} isOwner={isOwner} setIsOwner={setIsOwner} onMemberSelect={handleMemberSelect} />
      </div>
      <div className="middle-section">
        <ProductCompletionChart/>
      </div>
      <div className="bottom-section">
        {isOwner && (
          <div className="button-container">
            <div className="button-group">
            <Button
              className={`main-button ${shoppingList && shoppingList.archived ? 'archived' : ''}`}
              onClick={handleArchivovatClick}
            >
              {shoppingList && shoppingList.archived ? (
              language === 'cs' ? <p>Odarchivovat</p> : <p>Unarchive</p>
                ) : (
              language === 'cs' ? <p>Archivovat</p> : <p>Archive</p>
                )}
            </Button>
            <Button className="delete-button" onClick={handleSmazatClick}>
            {language === 'cs' ? <p>Smazat</p> : <p>Delete</p>}
            </Button>
            </div>
          </div>
          
        )}
      </div>

      

      <NotificationBar />

      <ConfirmationDialog
        open={isDeleteDialogOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        message={language === 'cs' ? <p>Opravdu chcete tento nákupní seznam smazat?</p> : <p>Do you really want to delete this shopping list?</p>}
      />
    </div>
    </ShoppingListProvider>
  );
};

export default ShoppingDetail;
