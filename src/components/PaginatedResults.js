import DeviceCard from 'pages/Dashboard/DeviceCard';
import React, { useState } from 'react';
import { Pagination, PaginationItem, PaginationLink, Row } from 'reactstrap';

import nonCarImg from '../assets/images/nonCarImg.png'

const PaginatedResults = ({
  itemsPerPage,
  modules,
  setModules,
  userModules,
  setUserModules,
  user,
  currentPage,
  setCurrentPage
}) => {
  
  const totalPages = Math.ceil(modules.length / itemsPerPage);

  // Calcula los índices del primer y último elemento de la página actual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Obtiene los elementos para la página actual
  const currentItems = modules.slice(startIndex, endIndex);

  // Función para cambiar de página
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <Row>
      {/* Renderiza los elementos de la página actual */}
      {(currentItems.length > 0) && currentItems.map(item => (
        <DeviceCard
          key={item.uid}
          module={item}
          moduleID = {item.uid}
          modulePIN={item.modulePIN}   
          moduleInstallDate={item.moduleInstallDate}
          batchNumber={item.batchNumber}
          isOn={item.isOn}
          carModulePict={item.carModulePict ? item.carModulePict : nonCarImg}
          modules={modules}
          setModules={setModules}
          userModules={userModules}
          setUserModules={setUserModules}
          user={user}
        />
      ))}
      {/* Renderiza la paginación */}
      <Pagination>
        <PaginationItem disabled={currentPage === 1}>
          <PaginationLink previous onClick={() => handlePageClick(currentPage - 1)} />
        </PaginationItem>
        {Array.from({ length: totalPages }, (_, index) => (
          <PaginationItem key={index} active={index + 1 === currentPage}>
            <PaginationLink onClick={() => handlePageClick(index + 1)}>
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem disabled={currentPage === totalPages}>
          <PaginationLink next onClick={() => handlePageClick(currentPage + 1)} />
        </PaginationItem>
      </Pagination>
    </Row>
  );
};

export default PaginatedResults;
