import DeviceCard from 'pages/Dashboard/DeviceCard';
import React, { useState } from 'react';
import { Pagination, PaginationItem, PaginationLink, Row } from 'reactstrap';

import nonCarImg from '../assets/images/nonCarImg.png'

/**
 * The PaginatedResults component in JavaScript handles pagination of items based on the specified
 * items per page and current page number.
 * @returns The `PaginatedResults` component is being returned. It renders a paginated list of items
 * based on the current page and items per page. It includes a list of items for the current page, a
 * pagination component to navigate between pages, and a `DeviceCard` component for each item on the
 * current page.
 */
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
          moduleInstallDate={item.sale_date ? item.sale_date.toDate().toLocaleDateString('en-US') : 'not installed'}
          batchNumber={item.batch_number}
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
